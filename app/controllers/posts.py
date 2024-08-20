from app import app
from flask import request, jsonify
from app.models.posts.posts import posts


@app.route("/getPostsUser", methods = ["POST"])
def getPostsUser ():

    data = request.get_json()

    user = data["user"]

    postagens = posts.getPostsUser (user)

    return jsonify({"response" : postagens})



@app.route("/addNewPost", methods = ["POST"])
def addNewPost ():

    data = request.get_json()

    user = data["user"]

    obj = data["object"]

    posts.addNewPost(user, obj)

    return jsonify({"response" : True})