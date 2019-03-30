import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './js/routes.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRouter)

axios.defaults.baseURL = 'https://wd1695319840sjftof.wilddogio.com/'
// Vue.use(axios)


const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior(to, from, savePosition) {
    // return { x: 0, y: 100 }
    if (savePosition) {
      return savePosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
//global defender
// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   // console.log(from)
//   // console.log(next);
//   if (to.path == '/login' || to.path == '/register') {
//     next();
//   } else {
//     alert('Sorry, but you should log in first.');
//     next('/login');
//   }
// })
//rear hooker
// router.afterEach((to, from) => {
//   alert('rear hooker used')
// })
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
