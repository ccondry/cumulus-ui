import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state.js'
import notifications from './modules/notifications.js'
import lightbox from './modules/lightbox.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    notifications,
    lightbox
  }
})
