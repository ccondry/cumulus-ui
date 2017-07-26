import * as types from 'src/store/mutation-types'

// initial state
const state = {
  notifications: []
}

// getters
const getters = {
  notifications: state => state.notifications
}

// actions
const actions = {
  successNotification ({commit, state}, message) {
    console.log(message)
    commit(types.ADD_NOTIFICATION, {
      title: 'Success',
      text: message,
      type: 'success',
      timeout: true
    })
  },
  failNotification ({commit, state}, message) {
    console.log(message)
    commit(types.ADD_NOTIFICATION, {
      title: 'Failed',
      text: message,
      type: 'danger',
      timeout: false
    })
  },
  addNotification ({commit, state}, notification) {
    commit(types.ADD_NOTIFICATION, notification)
  },
  removeNotification ({commit, state}, notification) {
    commit(types.REMOVE_NOTIFICATION, notification)
  }
}

// mutations
const mutations = {
  [types.ADD_NOTIFICATION] (state, data) {
    state.notifications.push(data)
  },
  [types.REMOVE_NOTIFICATION] (state, data) {
    // check if we're currently trying to load this fieldset right now
    let n = state.notifications.findIndex(e => {
      return e === data
    })
    if (n >= 0) {
      state.notifications.splice(n, 1)
    }
  }
}

// compiled object
export default {
  state,
  getters,
  actions,
  mutations
}
