from flask import Flask


app = Flask(__name__)


from app.controllers import rotas, funcoes

from app.database import crud, contas, seguidor, seguindo

