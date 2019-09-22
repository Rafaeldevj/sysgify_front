import { http } from '../config'

export default {

    getConquistas() {
        
        return http.get('/conquista')
    },

    getMyConquistas(id) {

        return http.get(`/usuario_conquista/minhas_conquistas/${id}`)
    }

}