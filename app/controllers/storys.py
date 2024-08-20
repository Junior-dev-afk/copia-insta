from app import app
from flask import jsonify, request
from app.models.storys.storys import storys


@app.route("/getEveryStorysUser", methods = ["POST"])
def getEveryStorysUser ():

    data = request.get_json()

    user = data["user"]



    return jsonify({"response" : True})

