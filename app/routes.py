from flask import render_template, request, jsonify
from app import app
from dotenv import load_dotenv
import os
from app.services.tmdb import TMDB


@app.route("/")
def index():
    return render_template("home_movies.html")


@app.route("/<string:page_name>")
def html_page(page_name):
    name = f"{page_name}.html"
    print(name)
    if name in os.listdir("app/templates"):
        return render_template(name)
    else:
        print(f"no such page: {name}")
        return "404 Page Not Found"


@app.route("/search")
def search_movies():
    query = request.args.get("q")
    page = request.args.get("page", 1)
    tmdb = TMDB(app.config["TMDB_API_KEY"])
    results = tmdb.search_multi(query, page)
    return jsonify(results)


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
