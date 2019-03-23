import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import Routes from './js/routes'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueRouter)

//custom global v-command
// Vue.directive('rainbow', {
//   bind(el, binding, vnode){
//     el.style.color = "#" + Math.random().toString(16).slice(2, 8)

//   }
// })
// Vue.directive('theme', {
//   bind(el, binding, vnode){
//     if(binding.value == 'wide'){
//       el.style.maxWidth = '1260px'
//     }else if(binding.value == 'narrow'){
//       el.style.maxWidth = '560px'
//     }else{
//       el.style.maxWidth = '800px'
//     }
//     if(binding.arg == 'column'){
//       el.style.backgroundColor = "#7dd1f0"
//       el.style.padding = "10px"
//       el.style.borderRadius = "5px"
//     }
//   }
// })

//custom global filter
// Vue.filter('to-upperCase', function(value){
//   return value.toUpperCase()
// })
// Vue.filter('snippet', function(value){
//   return value.slice(0, 200) + "..."
// })

//create router object
const router = new VueRouter({
  routes : Routes,
  mode: 'history'
})
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
