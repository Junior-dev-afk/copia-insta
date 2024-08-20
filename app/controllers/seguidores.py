from app import app
from flask import request, jsonify
from app.database import seguindo


@app.route("/seguir", methods = ["POST"])
def seguir():

    data = request.get_json()

    seguido = data["seguido"]
    seguidor = data["seguidor"]

    seguindo.seguir.create(seguidor, seguido)

    return jsonify({"pass" : True})


@app.route("/deixarDeSeguir", methods = ["POST"])
def deixarDeSeguir():

    data = request.get_json()

    seguido = data["seguido"]
    seguidor = data["seguidor"]

    seguindo.seguir.delete(seguidor, seguido)

    return jsonify({"pass" : True})


@app.route("/getAllSeguindo", methods = ["POST"])
def getAllSeguindo():

    data = request.get_json()

    user = data["user"]

    all = seguindo.seguir.read(user)

    return jsonify({"all" : all})

