import { http } from '../config'

export default {

    getMissoes(id) {

        return http.get(`/missao_analise/${id}`)
    }

}