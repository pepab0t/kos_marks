import os
import re
import time
from datetime import datetime
from functools import wraps

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

from exceptions import PageCodeException, UnauthorizedException

load_dotenv()

URL_LOGIN = "https://www.kos.cvut.cz/kos/login.do"
URL_RESULTS = "https://www.kos.cvut.cz/kos/results.do"

def pause(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        r = f(*args, **kwargs)
        input("Press ENTER to continue...")
        return r
    return wrapper


class KOSScraper:

    page_pattern = re.compile(r".*var pageCode='([\dA-Za-z]{10,})'.*")
    parser = "html.parser"

    def __init__(self, subject_code: str, check_interval: int):
        """check_interval in seconds"""

        self.s = requests.Session()
        self.page_code: str | None = None
        self.subject_code = subject_code
        self.check_interval: int = check_interval

    def login(self):
        response = self.s.post(URL_LOGIN, data={
                'userName': os.environ.get("username"),
                'password': os.environ.get("password"),
            })
        
        self.to_file(response.text)

        doc = BeautifulSoup(response.text, self.parser)

        if not self._logged(doc):
            raise UnauthorizedException("Not logged in")

        self.page_code = self._get_page_code(doc)
        if self.page_code is None:
            raise PageCodeException("Page code not found")

    def _logged(self, doc: BeautifulSoup) -> bool:
        log_forms = doc.find_all("form", {"method":"post", "name": re.compile(r"form|login")})
        return len(log_forms) == 0

    def _get_page_code(self, doc: BeautifulSoup) -> str | None:
        scripts = doc.find_all("script", text=self.page_pattern)

        if len(scripts) == 0:
            return None

        page_match = self.page_pattern.search(scripts[0].text)
        if page_match is None:
            return None

        return page_match[1]

    def get_subject_mark(self, doc: BeautifulSoup) -> str | None:
        a_tags = doc.find_all("a", text=self.subject_code)

        if len(a_tags) == 0:
            return None

        a = a_tags[0]

        tr = a.parent.parent
        td = tr.find("td", title=re.compile(r".*Datum klasifikace:.*"))
        if td is None:
            return None
        return td.text

    
    @pause
    def mainloop(self):
        
        while True:
            response = self.s.get('https://www.kos.cvut.cz/kos/results.do', cookies=self.s.cookies.get_dict(), params={"page": self.page_code})
            doc = BeautifulSoup(response.text, self.parser)
            if not self._logged(doc):
                try:
                    self.login()
                except (PageCodeException, UnauthorizedException) as e:
                    print(f"{e.__class__.__name__}: {e}")
                    return
                else:
                    response = self.s.get('https://www.kos.cvut.cz/kos/results.do', cookies=self.s.cookies.get_dict(), params={"page": self.page_code})

            doc = BeautifulSoup(response.text, self.parser)

            mark = self.get_subject_mark(doc)
            if mark is None:
                print("Didn't found appropriate tags, forced stop.")
                return
            if not mark.isspace():
                print(f"{datetime.now():%d.%m.%Y %H:%M} subject: {self.subject_code} mark: {mark}")
                break
            print(f"{datetime.now():%d.%m.%Y %H:%M} subject: {self.subject_code} mark: Unknown")
            time.sleep(self.check_interval)

    def to_file(self, html):
        with open("foo.html", 'w') as f:
            f.write(html)

