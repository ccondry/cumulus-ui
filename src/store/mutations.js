import * as types from './mutation-types'

export default {
  [types.SET_PLATFORM] (state, data) {
    state.platform = data
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
  }
}
