import * as types from 'src/store/mutation-types'
// import jQuery from 'jQuery'
// import notifications from 'src/store/modules/notifications.js'

const state = {
  userid: null
}

const getters = {
  userid: state => state.userid
}

const actions = {
  setUserid ({commit, state}, data) {
    commit(types.SET_USERID, data)
  }
}

const mutations = {
  [types.SET_USERID] (state, data) {
    state.userid = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
