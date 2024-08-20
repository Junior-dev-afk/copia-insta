import sqlite3
from app.database.contas import Conta
from app.database.todasContas import todasContas

def get_db_connection():
    conn = sqlite3.connect("app/datas/crud.db")
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            user TEXT NOT NULL,
            fotoPerfil TEXT NOT NULL,
            apelido TEXT NOT NULL,
            senha TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()

class DataBase :
    def __init__(self):
        pass

    def create (self, email, user, senha):
        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            INSERT INTO users (email, user, senha, fotoPerfil, apelido) VALUES (?, ?, ?, ?, ?)
        """, (email, user, senha, "false", "NONE-none",))
        connect.commit()
        connect.close()
        Conta(email, user, senha, "false", "NONE-none")

    def read (self, user):
        for user in todasContas.contas:
            if user.user == user:
                return user
        return False    

    def update(self, email, user, senha):
        pass

    def delete(self, user):
        pass

db = DataBase()


def createAllAccont():
    connect = get_db_connection()
    cursor = connect.cursor()
    cursor.execute("""
        SELECT * FROM users
    """)
    all = cursor.fetchall()
    for user in all:
        Conta(user["email"], user["user"], user["senha"], user["fotoPerfil"], user["apelido"])
    connect.close()

createAllAccont()
    
