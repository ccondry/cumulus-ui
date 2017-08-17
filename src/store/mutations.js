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
  }
}
