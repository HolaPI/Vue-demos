//first-class routes
import Home from '../components/Home.vue'
import Menu from '../components/Menu.vue'
import Admin from '../components/Admin.vue'
import About from '../components/about/About.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import User from '../components/User.vue'
import tempReload from '../components/tempReload.vue'
//second-class routes
import History from '../components/about/History.vue'
import Contact from '../components/about/Contact.vue'
import Delivery from '../components/about/Delivery.vue'
import OrderingGuide from '../components/about/OrderingGuide.vue'
//third-class routes
import Phone from '../components/about/contact/Phone.vue'
import PersonName from '../components/about/contact/PersonName.vue'

export const routes = [
    {
        path: '/', name: 'homeLink', components: {
            default: Home,
            'history': History,
            'delivery': Delivery,
            'orderingGuide': OrderingGuide
        }
    },
    { path: '/menu', name: 'menuLink', component: Menu },
    { path: '/admin', name: 'adminLink', component: Admin },
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
    {path: '/user', name: 'userLink', component: User},
    { path: '/login', name: 'loginLink', component: Login },
    { path: '/register', name: 'registerLink', component: Register },
    { path: '/temp-reload', name: 'tempLink', component: tempReload },
    { path: '*', redirect: '/' }
]