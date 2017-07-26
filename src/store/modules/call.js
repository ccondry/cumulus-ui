import * as types from '../mutation-types'

// module state
const state = {
  demoDnis: '12145701299',
  formattedDemoDnis: '1-214-570-1299'
}

// getters
const getters = {
  demoDnis: state => state.demoDnis,
  formattedDemoDnis: state => state.formattedDemoDnis
}

// actions
const actions = {
  setDemoDnis: ({commit, state, rootState}, data) => {
    console.log('changing demo DNIS to ', data)
    commit(types.SET_DEMO_DNIS, data)
  },
  startCall: ({commit, state, rootState}) => {
    let callLocation = `tel:${state.demoDnis}`
    console.log('starting phone call using browser redirect to ', callLocation)
    window.location.href = callLocation
  }
}

// mutations
const mutations = {
  [types.SET_DEMO_DNIS] (state, data) {
    state.demoDnis = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
