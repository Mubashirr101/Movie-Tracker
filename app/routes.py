from flask import render_template, request, jsonify
from app import app
from dotenv import load_dotenv
import os
from app.services.tmdb import TMDB
import requests

load_dotenv()
tmdb_key = os.getenv("TMDB_API_KEY")
print(tmdb_key)


@app.route("/")
def index():
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    # popular_movies = tmdb.get_popular_movies()
    return render_template("home_movies.html")


@app.route("/<string:page_name>")
def html_page(page_name):
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    # bookdb = BookDB(app.config["GOODREADS_API_KEY"])
    # popular_movies = tmdb.get_popular_movies()
    # popular_shows = tmdb.get_popular_shows()
    # popular_books = bookdb.get_popular_books()
    name = f"{page_name}.html"
    print(name)
    if name in os.listdir("app/templates"):
        return render_template(name)
    else:
        print(f"no such page: {name}")
        return "404 Page Not Found"


@app.route("/test_1")
def test_1():
    return render_template("test_1.html")


@app.route("/search")
def search_movies():
    query = request.args.get("q")
    page = request.args.get("page", 1)
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    results = tmdb.search_multi(query, page)
    return jsonify(results)


@app.route("/search_results")
def search_results():
    tmdb = app.config["TMDB_API_KEY"]
    return render_template("search_results.html", tmdb_api_key=tmdb)


@app.route("/movie/<int:movie_id>")
def get_movie_details(movie_id):
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    details = tmdb.get_movie_details(movie_id)
    return jsonify(details)


@app.route("/configuration")
def get_configuration():
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    config = tmdb.get_configuration()
    return jsonify(config)


@app.route("/api/movie/<int:movie_id>")
def get_movie(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={tmdb_key}&append_to_response=credits,release_dates"
    response = requests.get(url)
    print("route used")
    print(response)
    return jsonify(response.json())
