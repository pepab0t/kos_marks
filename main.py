from scraper import KOSScraper

SUBJECT_CODE: str = "2111706"

"""CHECK_INTERVAL is seconds"""
CHECK_INTERVAL: int = 1

if __name__ == "__main__":
    scraper = KOSScraper(SUBJECT_CODE, CHECK_INTERVAL)
    scraper.mainloop()