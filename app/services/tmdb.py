import requests


class TMDB:
    BASE_URL = "https://api.themoviedb.org/3"

    def __init__(self, api_key):
        self.api_key = api_key

    def _get(self, endpoint, params=None):
        url = f"{self.BASE_URL}{endpoint}"
        params = params or {}
        params.update({"api_key": self.api_key})
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()

    def search_multi(self, query, page=1):
        return self._get(
            "/search/multi",
            params={"query": query, "page": page, "include_adult": False},
        )

    def get_movie_details(self, movie_id):
        return self._get(
            f"/movie/{movie_id}", params={"append_to_response": "credits,videos,images"}
        )

    def get_configuration(self):
        return self._get("/configuration")
