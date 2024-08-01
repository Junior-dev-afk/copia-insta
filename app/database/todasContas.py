class TodasContas():

    def __init__(self) :
        self.contas = []

    def get (self, user):
        for users in self.contas:
            if users.user == user:
                return users

    def add (self, user):
        self.contas.append(user)

    def remove (self, user):    
        self.contas.remove(user)

    def getAllClassUsers(self):
        return self.contas

todasContas = TodasContas()
