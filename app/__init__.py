from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
from app.services.tmdb import TMDB
from flask_cors import CORS  # Import CORS

load_dotenv()
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

app.config["TMDB_API_KEY"] = os.getenv("TMDB_API_KEY")
app.config["GOODREADS_API_KEY"] = os.getenv("GOODREADS_API_KEY")

from app import routes
