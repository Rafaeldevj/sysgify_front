import { http } from '../config'

export default {

    getGrupos() {
        
        return http.get('/grupo')
    },

    salvar(grupo) {

        return http.post('/grupo', grupo);
    },

    atualizar(grupo) {

        return http.put('/grupo', grupo);
    },

    getGruposPaginado(itens, pagina) {

        return http.get(`/grupo/paginacao/${itens}?page=${pagina}`)
    }

}