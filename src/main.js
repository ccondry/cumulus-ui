import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSVGIcon from 'vue-svgicon'
import moment from 'moment'
import vueMoment from 'vue-moment'

import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'

import './styles/main.css'
import './styles/cisco-sans.css'
import './styles/bootstrap.css'
import './styles/flexslider.css'
// import './styles/font-awesome.css'
import './styles/templatemo_misc.css'
import './styles/templatemo_style.css'
import './styles/testimonails-slider.css'

import Formgroup from './components/formgroup.vue'
import FormgroupSubmit from './components/formgroup-submit.vue'
import Tooltip from './components/tooltip.vue'
import UnderHeading from './components/vertical-under-heading.vue'

// global.jQuery = require('jQuery')
// require('expose?$!expose?jQuery!jquery')

Vue.use(vueMoment, {
  moment
})
Vue.use(VueRouter)
Vue.use(VueSVGIcon)

Vue.component('formgroup', Formgroup)
Vue.component('formgroup-submit', FormgroupSubmit)
Vue.component('tooltip', Tooltip)
Vue.component('UnderHeading', UnderHeading)

Vue.config.productionTip = false

const app = new Vue({
  render: (h) => h(App),
  router,
  store
})

app.$mount('#app')
