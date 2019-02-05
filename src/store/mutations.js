import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.SET_PLATFORM] (state, data) {
    state.platform = data
  },
  [types.SET_MULTICHANNEL_TYPE] (state, data) {
    state.multichannelType = data
  },
  [types.SET_VERTICAL] (state, data) {
    state.vertical = data
  },
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_VERTICAL_CONFIG] (state, data) {
    state.verticalConfig = data
  },
  [types.SET_SESSION_ID] (state, data) {
    state.sessionId = data
  },
  [types.SET_DATACENTER] (state, data) {
    state.datacenter = data
  },
  [types.SET_NEEDS_SESSION] (state, data) {
    state.needsSession = data
  },
  [types.SET_SESSION_INFO] (state, data) {
    state.sessionInfo = data
  },
  [types.SET_CONTACT_PHONE] (state, data) {
    state.contact.phone = data
  },
  [types.SET_CONTACT_JACADA] (state, data) {
    state.contact.jacada = data
  },
  [types.SET_CONTACT_MOBILE] (state, data) {
    state.contact.mobile = data
  },
  [types.SET_CONTACT_PQ] (state, data) {
    state.contact.pq = data
  },
  [types.SET_CONTACT_UWF] (state, data) {
    state.contact.uwf = data
  },
  [types.SET_IS_LOCAL] (state, data) {
    state.isLocal = data
  },
  [types.SET_SHOW_ALL_VERTICALS] (state, data) {
    state.showAllVerticals = data
  },
  [types.SET_ENDPOINTS] (state, data) {
    state.endpoints = data
  },
  [types.SET_USE_SESSION_VERTICAL] (state, data) {
    state.useSessionVertical = data
  },
  [types.SET_WORKING] (state, data) {
    Vue.set(state.working, data.key, data.value)
  },
  [types.SET_LOADING] (state, data) {
    Vue.set(state.loading, data.key, data.value)
  }
}
