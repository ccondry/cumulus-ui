import * as types from '../mutation-types'

// module state
const state = {
  smsNumber: '12145707123',
  formattedSmsNumber: '1-214-570-7123'
}

// getters
const getters = {
  smsNumber: state => state.smsNumber,
  formattedSmsNumber: state => state.formattedSmsNumber
}

// actions
const actions = {
  setSmsNumber: ({commit, state, rootState}, data) => {
    console.log('changing SMS number to ', data)
    commit(types.SET_SMS_NUMBER, data)
  },
  sendSms: ({commit, state, rootState}, body = 'I would like some more information') => {
    let smsLocation = `sms:${state.smsNumber}&body=${encodeURIComponent(body)}`
    console.log('sending SMS using browser redirect to ', smsLocation)
    window.location.href = smsLocation
  }
}

// mutations
const mutations = {
  [types.SET_SMS_NUMBER] (state, data) {
    state.smsNumber = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
