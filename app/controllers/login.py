from flask import request, jsonify
from app import app
from app.database.crud import db
from app.database import contas


@app.route("/createAccount", methods = ["POST"])
def createAccount ():
    try:
        data = request.get_json()

        user = data['user']
        email = data['email']
        senha = data['senha']
        
        db.create(email, user, senha)

        return jsonify({"ok" : True})
    except :
        return jsonify({"data" : False})
            
@app.route("/verifyLogin", methods = ["POST"])
def verifyLogin ():

    data = request.get_json()

    user = data["user"]
    senha = data["senha"]

    return jsonify({"exist" : contas.verifyPassword(user, senha)})
    

@app.route("/isEmailExist", methods = ["POST"])
def isEmailExist ():
    
    data = request.get_json()

    email = data["email"]

    return jsonify({"exist" : contas.isEmailExist(email)})

@app.route("/isUserExist", methods = ["POST"])
def isUserExist ():
    
    data = request.get_json()

    user = data["user"]

    return jsonify({"exist" : contas.isAccountExist(user)})

