import { http } from '../config'

export default {

    getEquipes() {
        
        return http.get('/equipe')
    },

    getEquipesPaginado(itens, pagina) {

        return http.get(`/equipe/paginacao/${itens}?page=${pagina}`)
    },

    salvar(equipe) {

        return http.post('/equipe', equipe)
    }
}