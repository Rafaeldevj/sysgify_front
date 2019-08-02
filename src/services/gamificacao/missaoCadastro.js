import { http } from '../config'

export default {

    getMissaoDificuldade: () => {
        
        return http.get('/missao_dificuldade')
    },

    getMissaoSituacao: () => {
        
        return http.get('/missao_situacao')
    },

    getMissaoPrioridade: () => {
        
        return http.get('/missao_prioridade')
    },

    salvar(missao) {

        return http.post('/missao', missao)
    },

    getMissao(id) {

        return http.get(`/missao/${id}`)
    },

    atualizar(id, missao) {

        return http.put(`/missao/${id}`, missao)
    }

}