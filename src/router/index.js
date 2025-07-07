import VueRouter from 'vue-router'
import home from '../views/home.vue'
import about from '../views/about.vue'
import products from '../views/products.vue'
import services from '../views/services.vue'
import contact from '../views/contact.vue'
import config from '../views/config.vue'
import form from '../views/form.vue'
import upstream from '../views/upstream.vue'

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
