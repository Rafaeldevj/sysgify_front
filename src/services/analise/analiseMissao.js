import { http } from '../config'

export default {

    getMissoes(id) {

        return http.get(`/missao_analise/${id}`)
    },

    setaNovoPrazo(prazo) {

        return http.post('/usuarioMissao/setaNovoPrazo', prazo);
    },

    negarNovoPrazo(id) {

        return http.get(`/usuarioMissao/negarNovoPrazo/${id}`);
    },

    finalizarMissao(data) {

        return http.post('/missao_analise/finalizarMissao', data)
    }

}