import requests


class BookDB:
    BASE_URL = "https://www.goodreads.com"

    def __init__(self, api_key):
        self.api_key = api_key

    def _get(self, endpoint, params=None):
        url = f"{self.BASE_URL}{endpoint}"
        params = params or {}
        params.update({"key": self.api_key})
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.text

    def get_popular_books(self):
        return self._get("/book/popular", params={"page": 1, "per_page": 10})

    def get_book_details(self, book_id):
        return self._get(f"/book/show/{book_id}.xml")

    def search_books(self, query, page=1):
        return self._get("/search/index.xml", params={"q": query, "page": page})
