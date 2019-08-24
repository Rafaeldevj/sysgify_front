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
    },

    adicinarMembros(equipe, membros) {

        return http.post(`/usuario_equipe/${equipe}`, membros)
    },

    getMembros(equipe) {

        return http.get(`/usuario_equipe/${equipe}`)
    },

    removeMember(id) {

        return http.delete(`/usuario_equipe/remover/${id}`)
    },

    carregaUsuarios(equipe) {

        return http.get(`/usuario_equipe/usuarios/${equipe}`)
    }
}