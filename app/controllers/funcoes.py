from app import app 
from app.database.crud import db
from app.database import contas, seguindo
from app.database.todasContas import todasContas
from flask import request, jsonify


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
