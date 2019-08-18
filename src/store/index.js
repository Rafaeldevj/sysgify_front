import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario: {
            cd_usuario: null,
            nm_usuario: null,
            nm_login: null,
            nm_email: null,
            fl_ativo: null,
            nu_moedas: null,
            nu_experiencia: null,
            nu_nivel: null,
            dt_cadastro: null,
            nm_apelido: null,
            img_foto: null
        },
        grupo: {
            cd_grupo: null,
            nm_grupo: null
        }
    }
})