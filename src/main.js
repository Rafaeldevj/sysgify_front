import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import 'es6-promise/auto'
import store from './store/index'


Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
