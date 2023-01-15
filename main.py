from scraper import KOSScraper

SUBJECT_CODE: str = "2012050"


"""CHECK_INTERVAL is seconds"""
CHECK_INTERVAL: int = 3

if __name__ == "__main__":
    scraper = KOSScraper(SUBJECT_CODE, CHECK_INTERVAL)
    scraper.mainloop()
