from flask import Flask


app = Flask(__name__)


from app.controllers import rotas, funcoes, seguidores, login, posts
from app.database import crud, contas, seguidor, seguindo

