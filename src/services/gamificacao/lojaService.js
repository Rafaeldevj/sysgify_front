import { http } from '../config'

export default {

    getItensLoja() {

        return http.get('/item')
    },

    getItem(id) {

        return http.get(`/item/${id}`)
    },

    getMyItems(id) {

        return http.get(`/usuario_item/${id}/itens`)
    },

    saveItem(item) {

        return http.post('/item', item)
    },

    updateItem(item) {

        return http.put('/item', item)
    },

    buyItem(usuarioItem) {

        return http.post('/usuario_item', usuarioItem)
    },

    useItem(item) {

        return http.post('/item_analise', item)
    }

}