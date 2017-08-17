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
const singleProduct = resolve => require(['src/routes/single-product.vue'], resolve)
const contact = resolve => require(['src/routes/contact.vue'], resolve)
const config = resolve => require(['src/routes/config.vue'], resolve)

const routes = [
  { path: '/:demo/', name: 'vertical-select', component: home },
  { path: '/:demo/:vertical/' },
  { path: '/:demo/:vertical/config', name: 'config', component: config },
  { path: '/:demo/:vertical/home', name: 'home', component: home },
  { path: '/:demo/:vertical/about', name: 'about', component: about },
  { path: '/:demo/:vertical/products', name: 'products', component: products },
  { path: '/:demo/:vertical/services', name: 'services', component: services },
  { path: '/:demo/:vertical/single-product', name: 'single-product', component: singleProduct },
  { path: '/:demo/:vertical/contact', name: 'contact', component: contact }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
