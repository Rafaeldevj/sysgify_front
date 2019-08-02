import { http } from './config'

export default {

    infoNivel: (nivel) => {

        return http.get(`/nivel/info/${nivel}`);
    }

}