import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
// import * as types from './mutation-types'
import state from './state.js'
import user from './modules/user.js'
import socialminer from './modules/socialminer.js'
import ece from './modules/ece.js'
import rem from './modules/rem.js'
import sms from './modules/sms.js'
import call from './modules/call.js'
import contextService from './modules/context-service.js'
import notifications from './modules/notifications.js'
import authentication from './modules/authentication.js'
import lightbox from './modules/lightbox.js'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    user,
    ece,
    rem,
    sms,
    call,
    socialminer,
    contextService,
    notifications,
    authentication,
    lightbox
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
