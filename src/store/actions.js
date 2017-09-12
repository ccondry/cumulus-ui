import * as types from './mutation-types'
import axios from 'axios'
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

export const setVertical = async ({commit, state, rootState}, data) => {
  console.log('changing vertical to ', data)
  commit(types.SET_VERTICAL, data)
  // load vertical config from web services
  let options = {
    // headers: {
    //   'X-Auth-Token': authToken
    // }
  }
  let response = await axios.get(`${rootState.apiBase}/verticals/${rootState.vertical}`, options)
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
      console.log('vertical config for "' + data + '" was null (vertical not found).')
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
    const url = `${rootState.apiBase}/email`
    const body = {
      session: rootState.sessionId,
      datacenter: rootState.datacenter,
      email: data
    }
    axios.post(url, body)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export const startChat = ({commit, state, rootState, getters}, data) => {
  // open iframe
  // this.showChatIframe = true
  // open popup
  let url = addEceChatParameters(getters.dCloudEceChatUrl, data)
  let w = 400
  let h = 600
  let top = (window.screen.height / 2) - (h / 2)
  let left = (window.screen.width / 2) - (w / 2)
  window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
  // window.resize('400', '600')
}

export const startCallback = ({commit, state, rootState, getters}, data) => {
  // open iframe
  // this.showCallbackIframe = true
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
}

export const checkSession = ({state, commit}) => {
  console.log('window.localStorage.sessionId', window.localStorage.sessionId)
  // check localStorage for sessionId, and copy to state if state sessionId is not set
  if (window.localStorage.sessionId) {
    if (state.sessionId === null || state.sessionId === '') {
      commit(types.SET_SESSION_ID, window.localStorage.sessionId)
    } else {
      commit(types.SET_NEEDS_SESSION, true)
    }
  } else {
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.datacenter', window.localStorage.datacenter)
  // check localStorage for datacenter, and copy to state if state datacenter is not set
  if (window.localStorage.datacenter) {
    if (state.datacenter === null || state.datacenter === '') {
      commit(types.SET_DATACENTER, window.localStorage.datacenter)
    } else {
      commit(types.SET_NEEDS_SESSION, true)
    }
  } else {
    commit(types.SET_NEEDS_SESSION, true)
  }
}

export const setNeedsSession = ({commit, state, rootState}, data) => {
  commit(types.SET_NEEDS_SESSION, data)
}
