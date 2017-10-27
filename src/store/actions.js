import * as types from './mutation-types'
import axios from 'axios'
import notifications from './modules/notifications'
// import config from 'src/config'

// export const addToCart = ({ commit }, product) => {
//   if (product.inventory > 0) {
//     commit(types.ADD_TO_CART, {
//       id: product.id
//     })
//   }
// }

// export const shortenUrl = ({state, rootState}, {longUrl, callback}) => {
//   var xhr = new window.XMLHttpRequest()
//   var apiKey = rootState.tokens.createLink
//   var apiPath = '//public.cxdemo.net/create-link'
//   var apiUrl = apiPath + '?token=' + apiKey + '&longUrl=' + encodeURIComponent(longUrl)
//   xhr.open('GET', apiUrl)
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       console.log('shortenUrl: returned status ' + xhr.status)
//       if (xhr.status === 200) {
//         var shortUrl = JSON.parse(xhr.response).url
//         console.log('shortened URL = ', shortUrl)
//         console.log('entire response = ', xhr.response)
//         callback(shortUrl)
//       } else {
//         console.log('failed to shorten URL: ', xhr)
//       }
//     }
//   }
//   xhr.send()
// }

export const setFavicon = ({commit, state, rootState}, src) => {
  /*
  * Dynamically changing favicons with JavaScript
  * Works in all A-grade browsers except Safari and Internet Explorer
  * Demo: http://mathiasbynens.be/demo/dynamic-favicons
  */
  var link = document.createElement('link')
  var oldLink = document.getElementById('dynamic-favicon')
  link.id = 'dynamic-favicon'
  link.rel = 'shortcut icon'
  link.href = src
  if (oldLink) {
    console.log('removing old favicon', oldLink)
    document.head.removeChild(oldLink)
  }
  console.log('adding favicon code to HTML head', link)
  document.head.appendChild(link)
}

export const getVerticalConfig = async ({commit, state, rootState}) => {
  console.log('getting vertical config')
  let response = await axios.get(`${rootState.apiBase}/verticals/${rootState.vertical}`)
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    console.log('server response is valid.')
    if (response.data !== null) {
      console.log('storing vertical config in state')
      // store vertical config in state
      commit(types.SET_VERTICAL_CONFIG, response.data)
      console.log('vertical config =', response.data)
      // console.log('vertical config name =', response.data)
      setTitle({commit, state, rootState}, response.data.name)
      if (response.data.favicon) {
        setFavicon(response.data.favicon)
      }
    } else {
      console.log('vertical config for "' + state.vertical + '" was null (vertical not found).')
      // TODO display notification
    }
  } else {
    console.log('server response was bad')
    // TODO display notification
  }
  // return response
}

export const setPlatform = async ({commit, state, rootState}, data) => {
  console.log('changing platform to ', data)
  commit(types.SET_PLATFORM, data)
}

// change the HTML page title
export const setTitle = ({commit, state}, data) => {
  console.log('changing page title to', data)
  document.title = data || 'Cumulus'
}

export const getVerticals = async ({commit, state, rootState}, data) => {
  console.log('getting verticals list')
  // load vertical config from web services
  let options = {
    // headers: {
    //   'X-Auth-Token': authToken
    // }
  }
  let response = await axios.get(`${rootState.apiBase}/verticals`, options)
  // console.log(response)
  if (response.status >= 200 && response.status < 300) {
    // console.log('verticals list server response is valid.')
    if (response.data !== null) {
      console.log('verticals list =', response.data)
      console.log('storing verticals list in state')
      // store verticals list in state
      commit(types.SET_VERTICALS, response.data)
    } else {
      console.log('verticals list server response was null. Maybe there are no verticals configured?')
      // TODO display notification
    }
  } else {
    console.log('server response was bad: ', response)
    // TODO display notification
  }
  // return response
}

export const sendEmail = ({commit, state, rootState}, data) => {
  return new Promise((resolve, reject) => {
    // check session is valid
    if (state.sessionInfo === null) {
      // invalid session
      const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
      reject(message)
    } else {
      console.log(`state.isLocal = ${rootState.isLocal}`)
      let url
      let body
      // if (rootState.isLocal === true) {
      //   console.log(`rootState.isLocal is true?`)
      //   // local
      //   url = `https://branding.dcloud.cisco.com/api/v1/email`
      //   body = data
      // } else {
      // console.log(`rootState.isLocal is false?`)
      // remote
      url = `${rootState.apiBase}/email`
      body = {
        session: rootState.sessionId,
        datacenter: rootState.datacenter,
        email: data
      }
      // }
      console.log(`sending email to ${url}`)
      axios.post(url, body)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    }
  })
}

export const startChat = ({commit, state, rootState, getters}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    notifications.actions.failNotification({commit, state}, message)
  } else {
    // open popup
    let url = addEceChatParameters(getters.dCloudEceChatUrl, data)
    let w = 400
    let h = 600
    let top = (window.screen.height / 2) - (h / 2)
    let left = (window.screen.width / 2) - (w / 2)
    window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
    // window.resize('400', '600')
  }
}

export const startCallback = ({commit, state, rootState, getters}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    notifications.actions.failNotification({commit, state}, message)
  } else {
    // open popup
    let url
    // if (data.delay && data.delay !== 0 && data.delay !== '') {
    //   url = addEceParameters(config.ece.delayedCallbackUrl, data)
    // } else {
    url = addEceCallbackParameters(getters.dCloudEceCallbackUrl, data)
    // }
    let w = 400
    let h = 600
    let top = (window.screen.height / 2) - (h / 2)
    let left = (window.screen.width / 2) - (w / 2)
    window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
  }
}

function addEceChatParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&&fieldname_3=${data.phone}&fieldname_4=${encodeURIComponent(data.subject)}`
}

function addEceCallbackParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&&fieldname_3=${data.phone}&fieldname_4=0&fieldname_5=${encodeURIComponent(data.subject)}`
}

export const setSession = ({commit, state, rootState}, data) => {
  console.log('setting session ID to ' + data.sessionId)
  commit(types.SET_SESSION_ID, data.sessionId)
  // save in localStorage
  window.localStorage.sessionId = data.sessionId

  console.log('setting datacenter to ' + data.datacenter)
  commit(types.SET_DATACENTER, data.datacenter)
  // save in localStorage
  window.localStorage.datacenter = data.datacenter

  console.log('setting vertical to ' + data.vertical)
  commit(types.SET_VERTICAL, data.vertical)
  // save in localStorage
  window.localStorage.vertical = data.vertical

  console.log('setting isLocal to ' + data.isLocal)
  commit(types.SET_IS_LOCAL, data.isLocal === 'true')
  // save in localStorage
  window.localStorage.isLocal = data.isLocal
}

// check localStorage for site config data, and load into state if found
export const checkSession = ({state, commit, dispatch}, qs) => {
  console.log('query string =', qs)
  console.log('window.localStorage.sessionId', window.localStorage.sessionId)
  // check localStorage for sessionId, and copy to state
  if (qs.session) {
    commit(types.SET_SESSION_ID, qs.session)
    window.localStorage.sessionId = qs.session
  } else if (window.localStorage.sessionId) {
    commit(types.SET_SESSION_ID, window.localStorage.sessionId)
  } else {
    // not set, we need to ask
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.datacenter', window.localStorage.datacenter)
  // check query string and localStorage for datacenter, and copy to state
  if (qs.datacenter) {
    commit(types.SET_DATACENTER, qs.datacenter)
    window.localStorage.datacenter = qs.datacenter
  } else if (window.localStorage.datacenter) {
    commit(types.SET_DATACENTER, window.localStorage.datacenter)
  } else {
    // not set, we need to ask
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.vertical', window.localStorage.vertical)
  // check localStorage for datacenter, and copy to state
  if (qs.vertical) {
    commit(types.SET_VERTICAL, qs.vertical)
    window.localStorage.vertical = qs.vertical
  } else if (window.localStorage.vertical) {
    commit(types.SET_VERTICAL, window.localStorage.vertical)
  } else {
    // not set, we need to ask
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.isLocal', window.localStorage.isLocal)
  // check localStorage for isLocal, and copy to state
  if (qs.local === 'true') {
    commit(types.SET_IS_LOCAL, true)
    window.localStorage.isLocal = true
  } else if (qs.local === 'false') {
    commit(types.SET_IS_LOCAL, false)
    window.localStorage.isLocal = false
  } else if (window.localStorage.isLocal) {
    commit(types.SET_IS_LOCAL, window.localStorage.isLocal)
  } else {
    // we don't need to ask on this one
  }
  dispatch('getSessionInfo')
  // always pop up modal to ask for session info
  commit(types.SET_NEEDS_SESSION, true)
}

export const setNeedsSession = ({commit, state, rootState}, data) => {
  commit(types.SET_NEEDS_SESSION, data)
}

export const getSessionInfo = async ({commit, state, rootState}) => {
  console.log('getting session info')
  try {
    const response = await axios.get(`${rootState.apiBase}/datacenters/${rootState.datacenter}/sessions/${rootState.sessionId}`)
    console.log('session info acquired:', response)
    console.log('storing session info config in state')
    // store vertical config in state
    commit(types.SET_SESSION_INFO, response.data)
    // set up the voice call phone number
    try {
      commit(types.SET_CONTACT_PHONE, response.data.phone.international)
      commit(types.SET_CONTACT_MOBILE, response.data.mobile.international)
      commit(types.SET_CONTACT_JACADA, response.data.jacada.international)
    } catch (e1) {
      console.log(e1)
      // do nothing
    }
  } catch (e) {
    console.log('failed to get session info.', e)
    // set state data to null
    commit(types.SET_SESSION_INFO, null)
  }
}
