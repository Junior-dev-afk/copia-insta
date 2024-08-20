class Site {
    constructor(){

        this.button_deixar_seguir = false

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

    async gerarPessoasParaSeguir (localUser) {

        let divPai = document.querySelector(".container-pagina-inicial")

        let list = await this.carregarPessoasParaSeguir()
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

            if (user != localUser) {

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

    async drawPostPaginaInicial(post) {

        const div_pai = document.querySelector(".container-pagina-inicial")

        console.log(post.fotos[0]);

        const fotoInicial = post.fotos[0]
        const userFoto = await this.getInfosUser(post.user)

        let fotoPerfil = userFoto.foto

        if (fotoPerfil == "false") {
            fotoPerfil = "../icons_black/perfil_dark.png"
        }

        const divHTML = `
                <div style = "width:${((window.innerWidth /100) * 60 - 70)}px; height: auto;" class="post-pagina-inicial">
                    <div class="infos">
                        <div style="display: flex;">
                            <div class="foto-post">
                                <img style=" background-color: rgb(60, 60, 60); border-radius: 50%; width: 40px; height: 40px;" src="../static/uploads/${fotoPerfil}" alt="">
                            </div>
                            <div class="infos-post">
                                <label style="font-size: 16px;" for="" class="nome-post-pagina-inicial">${post.user}</label>
                                <label style="font-size: 12px;" for="" class="local-post-pagina-inicial">${post.local}</label>
                            </div>
                        </div>
                        <div style="width: 25px; height: 25px;" class="i-tree_dots"></div>
                    </div>
                    <div class="fotos-post-pagina-inicial">
                        <img style="width: 100%; height:auto; border-radius:5px;" src="../static/uploads/${fotoInicial}" alt="">
                    </div>
                    <div style="display: flex;" class="opcoes-posts">
                        <div  style="display: flex;">
                            <div style="width: 25px; margin: 5px" class="i-coracao"></div>
                            <div style="width: 25px; margin: 5px" class="i-chat-bubble"></div>
                            <div style="width: 25px; margin: 5px;" class="i-paper-airplane"></div>
                        </div>
                        <div>
                            <div style="width: 25px; height: 25px;" class="i-favorite"></div>
                        </div>
                    </div>
                    <div class="desc-post">${post.user} ${post.descricao}</div>
                    <label style="margin-block: 5px; font-size: 14px; color: rgb(65, 65, 65);" for="">Ver todos os 100 comentarios</label>
                    <div style="display: flex;">
                        <input type="text" placeholder="Adicionar comentario..." class="input-adicionar-comentario">
                        <button class="emoji-post-pagina-inicial">
                            <div style="width: 25px; height: 25px;" class="i-emoji" ></div>
                        </button>
                    </div>
                </div>
                `

         // Crie um novo elemento div para conter o HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = divHTML;

        // Adicione o conteúdo ao div_pai
        div_pai.appendChild(tempDiv);

        console.log(div_pai);
    }

    async gerarStorysPaginaInicial (user) {

        //const todosStorys = await storys.getEveryStorysFolloweds(user)

    }

    async gerarPostsPaginaInicial (user) {

        let divPai = document.querySelector(".container-pagina-inicial")

        const todosPosts = await posts.getEveryPostsFolloweds(user)

        for ( let post of todosPosts ) {

            console.log(post);

            this.drawPostPaginaInicial(post, divPai)

        }

    }

    async gerarPaginaInicial(user){

        let divPai = document.querySelector(".container-pagina-inicial")
    
        let todosSeguindo = await this.getAllSeguidosFromUser(user)

        if ( todosSeguindo.length > 0 ) {

            divPai.style["justify-content"] = "start"

            this.gerarStorysPaginaInicial(user)

            this.gerarPostsPaginaInicial(user)

        } else {

            divPai.style["justify-content"] = "center"
            this.gerarPessoasParaSeguir()

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

        const btn = this.button_deixar_seguir

        btn.innerHTML = "Seguir"
        btn.style["background-color"] = "rgb(61, 134, 202)"

        this.removerPedidoDeixarSeguir()
    }

    async adicionarPedidoDeixarSeguir ( my, user, btn ) {

        let conta = await this.getInfosUser(user)

        this.button_deixar_seguir = btn

        let conteudo = `
            <img style="width: 100px; height: 100px; border-radius: 50%; margin: 30px;" src="../${conta.foto}" alt="">
            <label style="color:aliceblue; font-size: 14px; margin-bottom: 30px;" for="">Deixar de seguir @${conta.user}?</label>
            <button style="font-size: 16px; color: rgb(250, 103, 103); width: 100%; height: 40px; border: none; background-color: transparent;" onclick="site.deixarDeSeguir('${my}', '${conta.user}')">Deixar de seguir</button>
            <button style="font-size: 16px; color: aliceblue; width: 100%; height: 40px; border: none; background-color: transparent;" onclick = "site.removerPedidoDeixarSeguir()">Cancelar</button>
        `
        let div_pai = document.querySelector(".confirmar-deixar-seguir")
        div_pai.innerHTML = conteudo

        div_pai.classList.add("visivel")

    }

    removerPedidoDeixarSeguir(){
        let div_pai = document.querySelector(".confirmar-deixar-seguir")
        div_pai.classList.remove("visivel")
        div_pai.innerHTML = ""
    }

}

const site = new Site()