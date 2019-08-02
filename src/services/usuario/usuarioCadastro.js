import { http } from '../config'

export default {

    getLogins() {
        
        return http.get('/usuario/logins')
    },

    getGrupos() {

        return http.get('/grupo')
    },

    salvar(usuario) {

        return http.post('/usuario', usuario)
    }

}