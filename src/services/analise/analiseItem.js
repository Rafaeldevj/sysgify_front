import { http } from '../config'

export default {

    getItems() {

        return http.get('/item_analise')
    },

    allowItem(data) {

        return http.post('/item_analise/permitir_item', data)
    }

}