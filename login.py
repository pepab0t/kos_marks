import os
import re

import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

url = "https://www.kos.cvut.cz/kos/login.do" 

payload = {
    'userName': os.environ.get("username"),
    'password': os.environ.get("password"),
}


def main():
    s = requests.Session()

    response = s.post(url, data=payload)

    soup = BeautifulSoup(response.text, "html.parser")

    pattern = re.compile(r".*var pageCode='([\dA-Za-z]+)'.*")

    scripts = soup.find_all("script", text=pattern)

    if len(scripts) == 0:
        print("no pageCode found")
        with open("page.html", 'w') as f:
            f.write(response.text)
        return

    page_match = pattern.search(scripts[0].text)
    if page_match is None:
        print("no pageCode found")
        return

    page_code = page_match[1]
    print(f"Page code found!")

    response = s.get('https://www.kos.cvut.cz/kos/subjectDetail.do', cookies=s.cookies.get_dict(), params={"page": page_code})
    with open("detail.html", 'w') as f:
        f.write(response.text)


if __name__ == "__main__":
    main()