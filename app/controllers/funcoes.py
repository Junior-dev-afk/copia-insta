from app import app 
from app.database.crud import db
from app.database import contas, seguindo
from app.database.todasContas import todasContas
from flask import request, jsonify


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


@app.route("/getAllSeguindo", methods = ["POST"])
def getAllSeguindo():

    data = request.get_json()

    user = data["user"]

    all = seguindo.seguir.read(user)

    return jsonify({"all" : all})


@app.route("/getAllUsers", methods = ["GET"])
def getAllUsers():

    todosUsers = todasContas.getAllClassUsers()

    users = []

    for u in todosUsers:
        users.append({'user' : u.user, 'seguidores' : u.seguidores, "seguindo" : u.seguindo, "apelido" : u.apelido, "fotoPerfil" : u.fotoPerfil})

    return jsonify({"users" : users})


@app.route("/getInfosUser", methods = ["POST"])
def getInfoUser():

    data = request.get_json()

    print(data)

    user = data["user"]

    conta = False

    for users in todasContas.contas:
        if users.user == user :
            conta = {
                    "user" : users.user,
                    "foto" : users.fotoPerfil,
                    "apelido" : users.apelido,
                    "seguidores" : users.seguidores, 
                    "seguindo" : users.seguindo
                }
            break

    return jsonify({'conta' : conta})



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

    