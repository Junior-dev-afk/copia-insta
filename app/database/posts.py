import sqlite3
import json
from datetime import datetime


def get_db_connection():
    conn = sqlite3.connect("app/datas/posts.db")
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            posts JSON
        )
    ''')
    conn.commit()
    conn.close()

initialize_database()

class DatabasePosts ():

    def __init__(self):
        self.todosPosts = {}


    def create (self, user, infos):
        data = {
            "user" : user,
            "local" : infos["local"],
            "descricao" : infos["descricao"],
            "fotos" : infos["fotos"],
            "curtidas" : infos["curtidas"],
            "comentarios" : infos["comentarios"],
            "time" : str(datetime.now())
        }

        connect = get_db_connection()
        cursor = connect.cursor()

        if user in self.todosPosts:
            data["id"] = f"{user}_{len(self.todosPosts[user])}"
            print(type(self.todosPosts[user]))
            self.todosPosts[user].append(data)
            data = json.dumps(self.todosPosts[user])
            cursor.execute("""
                UPDATE posts
                SET posts = ?
                WHERE user = ?;
            """, (data, user))
        else :
            data["id"] = f"{user}_1"
            data = json.dumps([data])
            print("segundo : "+data)
            cursor.execute("""
                INSERT INTO posts ( user, posts ) VALUES (?,?)
            """, (user, data))
            self.todosPosts[user] = data

        connect.commit()
        connect.close()


    def readAndCreatePreData (self):
        connect = get_db_connection()
        cursor = connect.cursor()
        cursor.execute("""
            SELECT * FROM posts
        """)
        all = cursor.fetchall()
        for user in all:
            self.todosPosts[user["user"]] = json.loads(user["posts"])


    def readAllPostsUser(self, user):
        if self.todosPosts.get(user):
            return self.todosPosts[user]
        return False


    def update ():
        pass


    def delete ():
        pass


databasePosts = DatabasePosts()

databasePosts.readAndCreatePreData()

databasePosts.create(
    "Junior2",
    {
            "user" : 'Junior2',
            "local" : "local",
            "descricao" : "descricao",
            "fotos" : ["emoji_dark.png"],
            "curtidas" : "curtidas",
            "comentarios" : "comentarios"
    }
)
