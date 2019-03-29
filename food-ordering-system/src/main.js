import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//first-class routes
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import Admin from './components/Admin.vue'
import About from './components/about/About.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
//second-class routes
import History from './components/about/History.vue'
import Contact from './components/about/Contact.vue'
import Delivery from './components/about/Delivery.vue'
import OrderingGuide from './components/about/OrderingGuide.vue'
//third-class routes
import Phone from './components/about/contact/Phone.vue'
import PersonName from './components/about/contact/PersonName.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'homeLink', component: Home },
  { path: '/menu', name: 'menuLink', component: Menu },
  {
    path: '/admin', name: 'adminLink', component: Admin,
    // beforeEnter: (to, from, next) => {
    //   // alert('you have log in first')
    //   // next(false)

    //   //local defender
    //   if (to.path === '/login' || to.path === '/register') {
    //     next();
    //   } else {
    //     next('/login');
    //   }
    // }
  },
  {
    path: '/about', name: 'aboutLink', redirect: '/contact', component: About, children: [
      { path: '/about/history', name: 'historyLink', component: History },
      {
        path: '/contact', name: 'contactLink', redirect: '/contact/person-name', component: Contact, children: [
          { path: '/contact/phone', name: 'phoneLink', component: Phone },
          { path: '/contact/person-name', name: 'personNameLink', component: PersonName }
        ]
      },
      { path: '/delivery', name: 'deliveryLink', component: Delivery },
      { path: '/ordering-guide', name: 'orderingGuideLink', component: OrderingGuide },
    ]
  },
  { path: '/login', name: 'loginLink', component: Login },
  { path: '/register', name: 'registerLink', component: Register },
  { path: '*', redirect: '/' }
]
const router = new VueRouter({
  routes,
  mode: 'history'
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
