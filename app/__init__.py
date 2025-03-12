from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
from app.services.tmdb import TMDB

# from config import Config
load_dotenv()
app = Flask(__name__)
app.config["TMDB_API_KEY"] = os.getenv("TMDB_API_KEY")

from app import routes
