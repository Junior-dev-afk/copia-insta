class LocalClient {
    constructor(user, senha){
        this.user = user
    }

    adicionarSeguidor (user) {

    }

    adicionarSeguindo (user) {

    }
}

var myAccont = false

function createClass(user) {
    myAccont = new LocalClient(user)
    sessionStorage.setItem("acc", myAccont.user)
}
