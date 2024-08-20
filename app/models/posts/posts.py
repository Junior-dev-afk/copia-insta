from app.database.posts import databasePosts

class Posts ():

    def __init__(self):
        pass


    def getPostsUser (self, user):
        return databasePosts.readAllPostsUser(user)
    
    def addNewPost (self, user, obj):
        databasePosts.create(user, obj)


posts = Posts()