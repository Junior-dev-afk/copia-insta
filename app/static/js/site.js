class Site {
    constructor(){

    }

    async getAllSeguidosFromUser(user){
        let response = await fetch("/getAllSeguindo", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"user" : user})
        })

        if (!response.ok) {
            throw new Error("erro ao pegas seguidores")
        }

        let data = await response.json()

        return data.all
    }

    async carregarPessoasParaSeguir(){
        let response = await fetch("/getAllUsers")

        if (!response.ok) {
            throw new Error("erro ao pegar todos seuidores -site")
        }

        let listaUsersObj = await response.json()

        return listaUsersObj.users

    }

    async gerarPaginaInicial(user){

        let divPai = document.querySelector(".container-pagina-inicial")
        
        let todosSeguindo = await this.getAllSeguidosFromUser(user)

        if ( todosSeguindo.length > 0 ) {

        } else {
            let list = await this.carregarPessoasParaSeguir()
            console.log(list);
            let div = document.createElement("div")
            div.className = "pessoas-para-seguir-pagina-inicial"
            divPai.appendChild(div)

            let con = `
                    <div style="display: flex; justify-content: space-between;">
                        <div style = "margin-top:20px; margin-left:20px;">
                            Recomendações
                        </div>
                    </div>
                `
            let index = 0 
            for (let user of list) {
                if (index == 0) {
                    let div23 = document.createElement("div")
                    div23.className = "pessoa-sugestao-seguir"
                    div23.innerHTML = con
                    div.appendChild(div23)
                }
                index++
                let div2 = document.createElement("div")
                div2.className = "pessoa-sugestao-seguir"

                let name = `
                    <div style="display:flex; flex-direction: column; margin-top: 4px; margin-left: 20px; height: 30px;">
                        <label>
                            ${user.user} 
                        </label>
                        <label style = "font-size: 12px;">
                            ${user.apelido}
                        </label>
                        <label style = "font-size:9px;">
                            Sugestões para você 
                        </label>
                    </div>
                `

                if ( user.apelido == "NONE-none" ){
                    name = `
                    <div style=" display:flex; flex-direction: column; margin-top: 11px; margin-left: 20px; height: 30px;">
                        <label>
                            ${user.user} 
                        </label>
                        <label style = "font-size:9px;">
                            Sugestões para você 
                        </label>
                    </div>
                `
                }

                let cont = `
                    <div style="display: flex; justify-content: space-between;">
                        <div style="display: flex;">
                            <img src="../${user.fotoPerfil}" style="margin-top: 10px; width: 40px; height: 40px; border-radius: 50%; outline: solid 1px black; margin-left: 20px;">
                                
                            ${name}
                            
                        </div>
                        <button style="color:white; border-radius:10px; width: auto; padding-inline: 15px; background-color: rgb(61, 134, 202); border: none;height: 35px; margin-top: 15px;margin-right: 20px;" onclick="seguirBTN_pagina_inicialuir('${user.user}', this)">Seguir</button>
                    </div>
                `
                div2.innerHTML = cont

                div.appendChild(div2)

            }
        }
    } 

    async getInfosUser ( user ) {
        let response = await fetch("/getInfosUser", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"user" : user})
        })

        if (!response.ok){
            throw new Error("erro ao pegar informaçoes de um usuario")
        }

        let data = await response.json()

        return data.conta
    }

    async comecarSeguir ( my, user ) {
        let response = await fetch("/seguir", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"seguido" : user, "seguidor" : my})
        })

        if ( !response.ok ) {
            throw new Error("Erro ao seguir")
        }

        return true

    }

    async deixarDeSeguir ( my, user ) {
        let response = await fetch("/deixarDeSeguir", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({"seguidor" : my, "seguido" : user})
        })

        if ( !response.ok ) {
            throw new Error( "Erro ao deixar de seguir" )
        }

        this.removerPedidoDeixarSeguir()
    }

    async adicionarPedidoDeixarSeguir ( my, user ) {

        let conta = await this.getInfosUser(user)

        let conteudo = `
            <img style="width: 100px; height: 100px; border-radius: 50%; margin: 30px;" src="../${conta.foto}" alt="">
            <label style="color:aliceblue; font-size: 14px; margin-bottom: 30px;" for="">Deixar de seguir @${conta.user}?</label>
            <button style="font-size: 16px; color: rgb(250, 103, 103); width: 100%; height: 40px; border: none; background-color: transparent;" onclick="site.deixarDeSeguir('${my}', '${conta.user}')">Deixar de seguir</button>
            <button style="font-size: 16px; color: aliceblue; width: 100%; height: 40px; border: none; background-color: transparent;" onclick = "site.removerPedidoDeixarSeguir()">Cancelar</button>
        `
        let div_pai = document.querySelector(".confirmar-deixar-seguir")
        div_pai.innerHTML = conteudo

        div_pai.classList.add("visivel")

        console.log(div_pai)
    }

    removerPedidoDeixarSeguir(){
        let div_pai = document.querySelector(".confirmar-deixar-seguir")
        div_pai.classList.remove("visivel")
        div_pai.innerHTML = ""
    }

}

const site = new Site()