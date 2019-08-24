import { http } from '../config'

export default {

    getUsuarios() {
        
        return http.get('/usuario')
    },

    ativarDesativarUsuario(id) {

        return http.post('/usuario/ativar', id)
    },

    getUsuariosCombo() {

        return http.get('/usuario/nomes')
    }

}