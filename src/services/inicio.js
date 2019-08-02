import { http } from './config'

export default {

    missoesUsuario(id) {

        return http.get(`/usuarioMissao/${id}`);
    }

}