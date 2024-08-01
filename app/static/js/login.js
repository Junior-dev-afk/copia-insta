let login_page = "login"

function logar(){
    if (!myAccont) {
        return alert("Voce nao esta logado")
    }
    let local = window.location.origin
    window.location.href = `${local}/`
}

function register_to_login () {
    if ( login_page == "register" ) {
        login_page = "login"
        let t = document.querySelector(".tampador")
        t.classList.add("anim_login_to_register")
        setTimeout(()=>{
            t.classList.remove("tampador_left")
            t.classList.remove("anim_login_to_register")
            t.classList.add("tampador_right")
        }, 1450)
    }
}


document.querySelector(".login-register").addEventListener("click", ()=>{
    if ( login_page == "login" ) {
        login_page = "register"
        let t = document.querySelector(".tampador")
        t.classList.add("anim_register_to_login")
        setTimeout(()=>{
            t.classList.remove("tampador_right")
            t.classList.remove("anim_register_to_login")
            t.classList.add("tampador_left")
        }, 1450)
    }
})

document.querySelector(".register-login").addEventListener("click", ()=>{
    register_to_login()
})

document.querySelector(".login").addEventListener("click", async ()=>{
    if ( login_page == "login" ) {
        let user = document.querySelector(".login-usuario").value
        let pw = document.querySelector(".login-senha").value

        if ( !user || !pw ) {
            return alert("Preencha todos os campos")
        }

        let response = await fetch("/verifyLogin", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"user" : user, "senha" : pw})
        })

        if( !response.ok ) {
            throw new Error("erro")
        }

        let data = await response.json()

        if (!data.exist){
            return alert("Usuario ou senha incorreto")
        }

        createClass(user, pw)

        logar()

    }
})

document.querySelector(".register").addEventListener("click", async ()=>{
    if ( login_page == "register" ) {
        let email = document.querySelector(".register-email").value
        let user = document.querySelector(".register-usuario").value
        let pw = document.querySelector(".register-senha").value
        let pw2 = document.querySelector(".register-confirme-senha").value
        if ( !email || !user || !pw ) {
            return alert("Preenca todos os campo")
        }

        if ( pw.trim().length < 8 ){
            return alert("Sua senha tem que ter ao menos 8 caracteres")
        }

        if ( !(pw == pw2) ) {
            return alert("As senhas não são iguais")
        }
        if (validarEmail(email)) {
            if (!await isEmailExis(email)) {
                if (!await isUserExist(user)) {
                    let response = await fetch("/createAccount", {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({"email" : email, "user" : user, "senha" : pw})
                    })
    
                    if ( !response.ok ) {
                        alert("Servidores indisponiveis para criar conta atualmente")
                        throw new Error("erro")
                    }
    
                    let data = await response.json()
    
                    if ( data.ok ) {
                        register_to_login()
                    } else {
                        alert("Servidores indisponiveis para criar conta atualmente")
                    }
    
                } else {
                    alert("Esse usuario ja esta em uso")
                }
            } else {
                alert("Esse email ja esta em uso")
            }
        } else {
            alert("Coloque um email verdadeiro")
        }
    }
})

function validarEmail(email) {
    const padraoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return padraoEmail.test(email);
}

async function isUserExist(user) {
    let response = await fetch("/isUserExist", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({"user" : user})
    })

    if (!response.ok){
        throw new Error("erro")
    }

    data = await response.json()

    return data.exist
}

async function isEmailExis(email){
    let response = await fetch("/isEmailExist", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({"email" : email})
    })

    if (!response.ok) {
        throw new Error("Erro");
    }

    let data = await response.json()

    return data.exist
}