import sqlite3
from app.database import seguindo



def get_db_connection():
    conn = sqlite3.connect("app/datas/seguidor.db")
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS seguidores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            my TEXT NOT NULL,
            user TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()


class Seguidores ():
    def __init__(self):
        pass

    def create (self, seguido, seguidor):

        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            INSERT INTO seguidores (my, user) VALUES (?, ?)
        """, (seguido, seguidor))
        connect.commit()
        connect.close()

    
    def userRemoveSeguidor (self, seguidor, seguido) :
        seguindo.seguir.delete(seguidor, seguido)


    def delete(self, seguidor, seguido):

        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            DELETE FROM seguidores WHERE my = ? AND user = ?
        """, (seguido, seguidor))
        connect.commit()
        connect.close()
    

    def read (self, user):
        
        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            SELECT * FROM seguidores WHERE my = ?
        """, (user,))
        all = cursor.fetchall()
        connect.close()
        sall = []
        for s in all :
            sall.append(s["user"])
        return sall

seguidores = Seguidores()
