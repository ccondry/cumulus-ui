import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import store from 'src/store'
import router from 'src/router.js'
import VueSVGIcon from 'vue-svgicon'

// global.jQuery = require('jQuery')
require('expose?$!expose?jQuery!jquery')

require('font-awesome/css/font-awesome.css')
require('bootstrap-webpack')
// require('!style!css!src/css/main.css')
require('!style!css!src/css/cisco-sans.css')
require('!style!css!src/css/bootstrap.css')
require('!style!css!src/css/flexslider.css')
require('!style!css!src/css/font-awesome.css')
require('!style!css!src/css/templatemo_misc.css')
require('!style!css!src/css/templatemo_style.css')
require('!style!css!src/css/testimonails-slider.css')
// <link rel="icon" href="https://static.ibmserviceengage.com/favicon.ico">
/* eslint-disable no-new */
const moment = require('moment')
// require('moment/locale/en')

Vue.use(require('vue-moment'), {
  moment
})

// console.log(Vue.moment().locale())
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSVGIcon)

Vue.component('UnderHeading', require('src/components/vertical-under-heading'))
// enable v-on:keyup.f1
Vue.config.keyCodes.f1 = 112

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')
