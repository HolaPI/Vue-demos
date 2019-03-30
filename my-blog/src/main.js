import Vue from 'vue'
//vue-resource has been aborted regular maintaining
// import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './js/routes'
import axios from 'axios'

Vue.config.productionTip = false
// Vue.use(VueResource)
Vue.use(VueRouter)
// axios global configuration
// axios.defaults.baseURL = 'https://myblog-666.firebaseio.com'
axios.defaults.baseURL = 'https://wd1695319840sjftof.wilddogio.com'

//create router object
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
