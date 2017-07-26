import * as types from '../mutation-types'
import notifications from './notifications'

// module state
const state = {
  needsAuthentication: false,
  authenticated: false,
  authToken: null
}

// getters
const getters = {
  needsAuthentication: state => state.needsAuthentication,
  authenticated: state => state.authToken === null,
  authToken: state => state.authToken
}

// actions
const actions = {
  checkLogin: ({commit, state, rootState, dispatch, getters}) => {
    // load the auth token into state
    dispatch('loadAuthToken')
    if (getters.authToken === null) {
      // still not authenticated - trigger login form
      commit(types.SET_NEEDS_AUTHENTICATION, true)
    }
  },
  setNeedsAuthentication: ({commit, state, rootState}, value) => {
    commit(types.SET_NEEDS_AUTHENTICATION, value)
  },
  setAuthenticated: ({commit, state, rootState}, value) => {
    commit(types.SET_AUTHENTICATED, value)
  },
  loadAuthToken: ({commit, state, rootState}) => {
    if (window.localStorage.authToken && window.localStorage.authToken !== 'undefined') {
      commit(types.SET_AUTH_TOKEN, window.localStorage.authToken)
    }
  },
  logout: ({commit, state, rootState}) => {
    let message = 'Successfully logged out.'
    notifications.actions.successNotification({commit, state}, message)
    // remove auth token from state and localstorage
    commit(types.SET_AUTH_TOKEN, null)
    window.localStorage.authToken = undefined
    // remove admin state information
    commit(types.SET_SPACES, null)
    // trigger the login form again
    commit(types.SET_NEEDS_AUTHENTICATION, true)
  },
  login: ({commit, state, rootState}, {username, success}) => {
    let message = 'Successfully logged in.'
    notifications.actions.successNotification({commit, state}, message)
    let token = username
    // set auth token in state and localstorage
    commit(types.SET_AUTH_TOKEN, token)
    window.localStorage.authToken = token
    // dismiss the login form
    commit(types.SET_NEEDS_AUTHENTICATION, false)
    // run callback
    if (typeof success === 'function') {
      success()
    }
  }
}

// mutations
const mutations = {
  [types.SET_NEEDS_AUTHENTICATION] (state, data) {
    state.needsAuthentication = data
  },
  [types.SET_AUTH_TOKEN] (state, data) {
    state.authToken = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
