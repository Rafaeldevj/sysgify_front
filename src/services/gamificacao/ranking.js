import { http } from '../config'

export default {

    getRanking: () => {
        
        return http.get('/ranking')
    }

}