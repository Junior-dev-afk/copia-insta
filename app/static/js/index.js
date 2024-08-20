let myAcc = sessionStorage.getItem("acc")

if ( !myAcc ) {
    window.location.href = `${window.location.origin}/login`
}

site.gerarPaginaInicial(myAcc)

let delayBotaoSegui = false

async function seguirBTN_pagina_inicialuir (user, btn) {
    if (!delayBotaoSegui){
        delayBotaoSegui = true

        if ( btn.innerHTML == "Seguindo" ){
            
            await site.adicionarPedidoDeixarSeguir(myAcc, user, btn)
    
        } else {
            let seguido = await site.comecarSeguir(myAcc, user)
            if ( seguido ) {
                btn.innerHTML = "Seguindo"
                btn.style["background-color"] = "rgb(42, 43, 44)"
            }
            
        }
        delayBotaoSegui = false
    }
}