import { http } from '../config'

export default {

    getItems() {

        return http.get('/item_analise')
    }

}