import { http } from './config'

export default {

    missoesUsuario(id) {

        return http.get(`/usuarioMissao/${id}`);
    },

    iniciarMissao(status) {

        return http.post(`/usuarioMissao/iniciarMissao`, status);
    },

    analisarMissao(status) {

        return http.post(`/usuarioMissao/analisarMissao`, status);
    },

    finalizarMissao(status) {

        return http.post(`/usuarioMissao/finalizarMissao`, status);
    },

    pausarMissao(id) {

        return http.get(`/usuarioMissao/pausarMissao/${id}`)
    },

    solicitarPausa(id) {

        return http.get(`/usuarioMissao/solicitarPausa/${id}`)
    },

    retomarMissao(id) {

        return http.get(`/usuarioMissao/retomarMissao/${id}`)
    },

    novoPrazo(data) {

        return http.post('usuarioMissao/novoPrazo', data);
    }

}