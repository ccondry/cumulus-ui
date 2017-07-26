import * as types from 'src/store/mutation-types'
// import jQuery from 'jQuery'
// import notifications from 'src/store/modules/notifications.js'

// encode a string into hexadecimal-endcoded string values
function toHexString (str) {
  var hexStr = ''
  if (!str) {
    return hexStr
  }
  for (let i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    var hChar = c.toString(16)
    // Pad
    if (hChar.length < 2) {
      hexStr += '0'
    }
    hexStr += hChar
  }
  return hexStr
}

const state = {
  activeSession: false,
  inSupport: false,
  destination: 'sip:7005@cxdemo.net',
  baseUrl: 'https://rem2.cxdemo.net',
  configuration: {
    url: 'https://rem2.cxdemo.net',
    sdkPath: 'https://rem2.cxdemo.net/assistserver/sdk/web/consumer',
    destination: 'sip:7005@cxdemo.net',
    uui: toHexString(window.localStorage.userid)
  },
  shortCode: null,
  lib1: () => {
    return state.baseUrl + '/assistsample/js/assist-support.js'
  },
  lib2: () => {
    return state.baseUrl + '/assistsample/js/short-code-assist.js'
  },
  sdkPath: () => {
    return state.baseUrl + '/assistserver/sdk/web/consumer'
  },
  assistJS: () => {
    return state.sdkPath() + '/assist.js'
  }
}

const getters = {
  shortCode: state => state.shortCode,
  activeRemSession: state => state.activeSession,
  inRemSupport: state => state.inSupport
}

const actions = {
  supportEnded ({commit, state, rootState}) {
    commit(types.SET_REM_ACTIVE_SESSION, false)
    commit(types.SET_REM_IN_SUPPORT, false)
  },
  connectionEstablished ({commit, state, rootState}) {
    commit(types.SET_REM_ACTIVE_SESSION, true)
    console.log('on connection established called')
    window.localStorage.removeItem('cid-only')
  },
  storeRemConfiguration ({commit, state, rootState}) {
    console.log('storing REM config')
    commit(types.SET_REM_CONFIG, {
      url: state.baseUrl,
      sdkPath: state.sdkPath(),
      destination: state.destination,
      uui: toHexString(rootState.user.userid)
      // correlationId: "assist-altocloud-1707"
    })
  },
  startRemCall ({commit, state, rootState}) {
    console.log('attempting to start REM call')
    // start REM Call
    window.AssistSDK.startSupport(state.configuration)
  },
  getShortCode ({commit, state, rootState, dispatch}) {
    // get a cid/session token via the short code servlet
    var shortCodeRequest = new window.XMLHttpRequest()
    shortCodeRequest.onreadystatechange = () => {
      if (shortCodeRequest.readyState === 4) {
        if (shortCodeRequest.status === 200) {
          console.log('getShortCode response = ', shortCodeRequest.responseText)
          var shortCodeResponse = JSON.parse(shortCodeRequest.responseText)

          var shortCode = shortCodeResponse.shortCode
          console.log('getShortCode shortCode = ', shortCode)
          // store shortCode in state
          commit(types.SET_REM_SHORT_CODE, shortCode)
          dispatch('startWithShortCode', shortCode)
        } else {
          // TODO Report failure to start
        }
      }
    }
    shortCodeRequest.open('PUT', (state.configuration.url || '') + '/assistserver/shortcode/create', true)
    shortCodeRequest.send()
  },
  startWithShortCode ({commit, state, rootState}, shortCode) {
    var tokenRequest = new window.XMLHttpRequest()
    tokenRequest.onreadystatechange = () => {
      if (tokenRequest.readyState === 4) {
        if (tokenRequest.status === 200) {
          var tokenResponse = JSON.parse(tokenRequest.responseText)
          if (typeof (state.configuration) === 'string' || typeof (state.configuration) === 'undefined') {
            state.configuration = {}
          }
          state.configuration.sessionToken = tokenResponse['session-token']
          state.configuration.correlationId = tokenResponse.cid
          delete state.configuration.destination

          if (!state.configuration.scaleFactor) {
            state.configuration.scaleFactor = tokenResponse.scaleFactor
          }

          state.configuration.allowedIframeOrigins = false // important: disable iframe messaging if not required for security
          window.AssistSDK.startSupport(state.configuration)
          // callback(shortCode)
        } else {
          // TODO Report failure to start
        }
      }
    }
    tokenRequest.open('GET', (state.configuration.url || '') + '/assistserver/shortcode/consumer?appkey=' + shortCode, true)
    tokenRequest.send()

    // console.log('attempting to send Agent Request API call')
    // send agent request API
    // let arUrl = 'https://labs.cxdemo.net/labconfig/api/public/instance/pcce/ccp/callback/feed/100020?title=Remote%20Expert&name=Jane%20Smith&description=This%20is%20an%20example%20callback%20request&mediaAddress=' + QueryString.mediaAddress + '&variable_user_user.id=' + QueryString.uui;

    // var startAgentRequest = new XMLHttpRequest()
    // startAgentRequest.onreadystatechange = function (rsp) {
    //   if (startAgentRequest.readyState == 4) {
    //     if (startAgentRequest.status == 200) {
    //       console.log('successfully sent Agent Request API call: ', rsp)
    //     } else {
    //       console.log('failed to send Agent Request API call: ', rsp)
    //     }
    //   }
    // }
    // startAgentRequest.open("GET", arUrl + '&variable_cv_10=' + shortCode)
    // startAgentRequest.send()
  }
}

// mutations
const mutations = {
  [types.SET_REM_SHORT_CODE] (state, data) {
    state.shortCode = data
  },
  [types.SET_REM_CONFIG] (state, data) {
    state.configuration = data
  },
  [types.SET_REM_ACTIVE_SESSION] (state, data) {
    state.activeSession = data
  },
  [types.SET_REM_IN_SUPPORT] (state, data) {
    state.inSupport = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
