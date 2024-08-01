from app.database import seguindo, seguidor
from app.database.todasContas import todasContas


def verifyPassword(user, senha):
    for users in todasContas.contas:
        if users.user == user:
            if users.senha == senha:
                return True
    return False

def isAccountExist(user):
    if any( user in obj.values() for obj in todasContas.contas):
        return True


def isEmailExist(email):
    for user in todasContas.contas:
        if user.email == email:
            return True
    return False



class Conta():
    
    def __init__(self, email, user, senha, fotoPerfil, apelido) :
        self.email = email
        self.user = user
        self.senha = senha
        self.seguidores = []
        self.seguindo = []
        self.fotoPerfil = fotoPerfil
        self.apelido = apelido
        self.addAccountInList()
        self.getAllSeguidores()
        self.getAllSeguindo()


    def addAccountInList(self):
        todasContas.add(self)



    def removeSeguindo(self, user):
        if user in self.seguindo:
            self.seguindo.remove(user)
            print("seguido removido")

    def adicionarSeguindo(self, user):
        self.seguindo.append(user)

    def getAllSeguindo(self):
        self.seguindo = seguindo.seguir.read(self.user)



    def removeSeguidor(self, user):
        if user in self.seguidores:
            self.seguidores.remove(user)
            print("seguidor removido")

    def adicionarSeguidor(self, user):
        self.seguidores.append(user)   

    def getAllSeguidores(self):
        self.seguidores = seguidor.seguidores.read(self.user)
        print(self.seguidores)



