import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.component('formgroup', require('src/components/formgroup'))
Vue.component('formgroup-submit', require('src/components/formgroup-submit'))
Vue.component('tooltip', require('src/components/tooltip'))

const home = resolve => require(['src/routes/home.vue'], resolve)
const about = resolve => require(['src/routes/about.vue'], resolve)
const products = resolve => require(['src/routes/products.vue'], resolve)
const services = resolve => require(['src/routes/services.vue'], resolve)
const contact = resolve => require(['src/routes/contact.vue'], resolve)
const config = resolve => require(['src/routes/config.vue'], resolve)
const form = resolve => require(['src/routes/form.vue'], resolve)
const upstream = resolve => require(['src/routes/upstream.vue'], resolve)

const routes = [
  { path: '/config', name: 'config', component: config },
  { path: '/', name: 'index', component: home },
  { path: '/home', name: 'home', component: home },
  { path: '/about', name: 'about', component: about },
  { path: '/products', name: 'products', component: products },
  { path: '/services', name: 'services', component: services },
  { path: '/contact', name: 'contact', component: contact },
  { path: '/form', name: 'form', component: form },
  { path: '/upstream', name: 'upstream', component: upstream }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

function hasQueryParams (route) {
  return !!Object.keys(route.query).length
}

router.beforeEach((to, from, next) => {
  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({name: to.name, query: from.query})
  } else {
    next()
  }
})

export default router
