from flask import render_template
from app import app


@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/")
def index():
    return render_template("index.html")