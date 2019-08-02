import { http } from '../config'

export default {

    getMissoes() {
        
        return http.get('/missao')
    },

    getMissoesPaginado(itens, pagina) {

        return http.get(`/missao/paginacao/${itens}?page=${pagina}`)
    },

    getMissao(id) {
        
        return http.get(`missao/${id}`)
    },

    informacaoMissao(id) {

        return http.get(`missao/infoMissao/${id}`)
    },

    delegarMissaoUsuario(usuarioMissao) {

        return http.post('/usuarioMissao', usuarioMissao)
    }
}