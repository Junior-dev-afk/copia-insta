class Posts {

    constructor () {}

    converterParaData(dataHoraStr) {
        const dataHoraISO = dataHoraStr.replace(' ', 'T').replace(/\.(\d+)$/, '.$1Z'); // Ajusta para o formato ISO 8601
        return new Date(dataHoraISO);
    }

    ordernarDataEhora(arr, chaveDataHora){
        return arr.sort((a, b) => {
            const dataA = this.converterParaData(a[chaveDataHora]);
            const dataB = this.converterParaData(b[chaveDataHora]);
            return dataB - dataA; // Ordena do mais antigo para o mais novo
        });
    }

    async getEveryPostsFolloweds (user) {

        const listUsersFolloweds = await site.getAllSeguidosFromUser(user)

        const postsList = []

        for ( let user of listUsersFolloweds ) {

            const response = await fetch("/getPostsUser", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({user : user})
            })

            if ( !response.ok ) {
                throw new Error('erro ao pegar posts de usuario')
            }

            const postagens = await response.json()

            postsList.push(postagens.response)

        }

        const postsListOrganizado = this.ordernarDataEhora(postsList[0], "time")

        return postsListOrganizado

    }

}

const posts = new Posts()