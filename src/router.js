import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.component('formgroup', require('src/components/formgroup'))
Vue.component('formgroup-submit', require('src/components/formgroup-submit'))
Vue.component('tooltip', require('src/components/tooltip'))
Vue.component('login-modal', require('src/components/login-modal'))

const home = resolve => require(['src/routes/home.vue'], resolve)
const about = resolve => require(['src/routes/about.vue'], resolve)
const products = resolve => require(['src/routes/products.vue'], resolve)
const services = resolve => require(['src/routes/services.vue'], resolve)
const contact = resolve => require(['src/routes/contact.vue'], resolve)
const config = resolve => require(['src/routes/config.vue'], resolve)

const routes = [
  // { path: '/:demo/', name: 'vertical-select', component: home },
  // { path: '/:demo/:vertical/' },
  { path: '/config', name: 'config', component: config },
  { path: '/', name: 'index', component: home },
  { path: '/home', name: 'home', component: home },
  { path: '/about', name: 'about', component: about },
  { path: '/products', name: 'products', component: products },
  { path: '/services', name: 'services', component: services },
  { path: '/contact', name: 'contact', component: contact }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
