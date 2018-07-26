import * as types from 'src/store/mutation-types'
import Vue from 'vue'

// initial state
const state = {
  lightbox: {
    open: false,
    src: '',
    alt: ''
  }
}

// getters
const getters = {
  lightbox: state => state.lightbox
}

// actions
const actions = {
  openLightbox ({commit, state}, {src, alt}) {
    commit(types.LIGHTBOX_OPEN, {src, alt})
  },
  closeLightbox ({commit, state}) {
    commit(types.LIGHTBOX_CLOSE)
  }
}

// mutations
const mutations = {
  [types.LIGHTBOX_OPEN] (state, {src, alt}) {
    Vue.set(state.lightbox, 'src', src)
    Vue.set(state.lightbox, 'alt', alt)
    Vue.set(state.lightbox, 'open', true)
  },
  [types.LIGHTBOX_CLOSE] (state, data) {
    Vue.set(state.lightbox, 'open', false)
  }
}

// compiled object
export default {
  state,
  getters,
  actions,
  mutations
}
