import { http } from '../config'

export default {

    getItensLoja() {

        return http.get('/item')
    }

}