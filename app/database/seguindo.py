import sqlite3
from app.database import seguidor
from app.database.todasContas import todasContas



def get_db_connection():
    conn = sqlite3.connect("app/datas/seguindo.db")
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS seguindo (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            my TEXT NOT NULL,
            user TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()
        


class Seguindo ():

    def __init__(self):
        pass

    def create (self, seguidor2, seguido):

        if seguidor2 != seguido:

            class_seguidor = todasContas.get(seguidor2)
            class_seguido = todasContas.get(seguido)

            if not seguido in class_seguidor.seguindo:
                
                class_seguidor.adicionarSeguindo(seguido)
                connect = get_db_connection()
                cursor = connect.cursor()
                cursor.execute("""
                    INSERT INTO seguindo (my, user) VALUES (?, ?)
                """, (seguidor2, seguido))
                connect.commit()
                connect.close()

            if not seguidor2 in class_seguido.seguidores:

                class_seguido.adicionarSeguidor(seguidor2)
                seguidor.seguidores.create(seguido, seguidor2)


    def read (self, user):
        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            SELECT * FROM seguindo WHERE my = ?
        """, (user,))
        all = cursor.fetchall()
        sall = []
        for s in all :
            sall.append(s["user"])

        return sall

    def delete (self, seguidor2, seguido):

        class_seguidor = todasContas.get(seguidor2)
        class_seguido = todasContas.get(seguido)

        class_seguidor.removeSeguindo(seguido)
        class_seguido.removeSeguidor(seguido)

        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            DELETE FROM seguindo WHERE my = ? AND user = ?
        """, (seguidor2, seguido))
        connect.commit()
        connect.close()
        seguidor.seguidores.delete(seguidor2, seguido)
        

seguir = Seguindo()

