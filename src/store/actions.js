import * as types from './mutation-types'
import axios from 'axios'
import notifications from './modules/notifications'

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
  let response = await axios.get(`${rootState.apiBase}/verticals`)
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

export const sendEmail = async ({commit, state, rootState, dispatch, getters}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    dispatch('failNotification', message)
    throw new Error(message)
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
      to: getters.demoEmailAddress,
      session: rootState.sessionId,
      datacenter: rootState.datacenter,
      email: data
    }
    // }
    console.log(`sending email to ${url}`)
    try {
      commit(types.SET_WORKING, {key: 'email', value: true})
      const response = await axios.post(url, body)
      dispatch('successNotification', 'Successfully sent email')
      return response
    } catch (e) {
      console.log('failed to send email', e.response.data)
      dispatch('failNotification', e.response.data)
      throw e
    } finally {
      commit(types.SET_WORKING, {key: 'email', value: false})
    }
  }
}

export const sendTaskRequest = async ({commit, state, rootState, dispatch}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    dispatch('failNotification', message)
    throw new Error(message)
  } else {
    let url = `${rootState.apiBase}/task`
    let body = {
      session: rootState.sessionId,
      datacenter: rootState.datacenter,
      task: data
    }
    console.log(`sending Task Request to ${url}`)
    try {
      commit(types.SET_WORKING, {key: 'task', value: true})
      const response = await axios.post(url, body)
      dispatch('successNotification', 'Successfully sent request')
      return response
    } catch (e) {
      console.log('failed to send task request', e.message)
      dispatch('failNotification', 'Failed to send request: ' + e.message)
      throw e
    } finally {
      commit(types.SET_WORKING, {key: 'task', value: false})
    }
  }
}

// Start non-bot chat
export const startChat = ({commit, state, rootState, getters}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    notifications.actions.failNotification({commit, state}, message)
  } else {
    // valid session
    if (getters.sessionDemo === 'uccx') {
      // UCCX mode
      // open chat bot window with bot = false
      // open popup
      let url = addSparkyChatParameters(getters.dCloudSparkyUrl, getters.datacenter, getters.sessionId, data)
      // add bot = false to sparky URL
      url += '&botEnabled=false'
      let w = 400
      let h = 600
      let top = (window.screen.height / 2) - (h / 2)
      let left = (window.screen.width / 2) - (w / 2)
      window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
      // window.resize('400', '600')
      return
    } else {
      // PCCE mode
      // check which multichannel is set up
      if (getters.multichannel === 'ece') {
        // open popup
        let url = addEceChatParameters(getters.dCloudEceChatUrl, data)
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        // window.resize('400', '600')
        return
      } else if (getters.multichannel === 'upstream') {
        // open popup
        let url = addUpstreamChatParameters(getters.upstreamChatUrl, data)
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        // window.resize('400', '600')
        return
      } else if (getters.multichannel === 'sfdc') {
        // TODO implement this
        console.log('this is where we would open SFDC chat form')
      }
    }
  }
}

// Start Sparky chat bot
export const startBot = ({commit, state, rootState, getters}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    notifications.actions.failNotification({commit, state}, message)
  } else {
    // open popup
    let url = addSparkyChatParameters(getters.dCloudSparkyUrl, getters.datacenter, getters.sessionId, data)
    let w = 400
    let h = 600
    let top = (window.screen.height / 2) - (h / 2)
    let left = (window.screen.width / 2) - (w / 2)
    window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
    // window.resize('400', '600')
  }
}

export const startCallback = async ({commit, state, rootState, getters, dispatch}, data) => {
  // check session is valid
  if (state.sessionInfo === null) {
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    // notifications.actions.failNotification({commit, state}, message)
    dispatch('failNotification', message)
  } else {
    if (getters.sessionDemo === 'uccx') {
      console.log('sending callback request to UCCX demo')
      // send REST request to reverse proxy on UCCX demo to start callback
      try {
        const url = `${rootState.apiBase}/callback`
        const body = {
          session: rootState.sessionId,
          datacenter: rootState.datacenter,
          callback: {
            firstname: data.firstName,
            lastname: data.lastName,
            emailaddress: data.email,
            callback: data.phone
          }
        }
        console.log(`sending callback request to ${url}`)
        commit(types.SET_WORKING, {key: 'callback', value: true})
        const response = await axios.post(url, body)

        // notifications.actions.successNotification({commit, state}, `Your callback request has been successfully scheduled. Your estimated wait time is ${response.data.WaitingSecond} seconds.`)
        dispatch('successNotification', `Your callback request has been successfully scheduled. Your estimated wait time is ${response.data.WaitingSecond} seconds.`)
      } catch (e) {
        console.log('failed to send callback request', e)
        // failed to start callback - send notification
        // notifications.actions.failNotification({commit, state}, e)
        dispatch('failNotification', e.response.data)
      } finally {
        commit(types.SET_WORKING, {key: 'callback', value: false})
      }
    } else {
      // pcce
      // open popup to ECE callback
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
}

/*
 add URL query parameters to the chat URLs to pass customer data, for
 bypassing the pre-chat forms
*/
function addEceChatParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&&fieldname_3=${data.phone}&fieldname_4=${encodeURIComponent(data.subject)}`
}

function addSparkyChatParameters (url, datacenter, session, data) {
  return url + `?firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&email=${encodeURIComponent(data.email)}&phone=${data.phone}&session=${session}&datacenter=${datacenter}`
}

function addEceCallbackParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&&fieldname_3=${data.phone}&fieldname_4=0&fieldname_5=${encodeURIComponent(data.subject)}`
}

function addUpstreamChatParameters (url, data) {
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
  // check query string then localStorage for isLocal, and copy to state
  if (qs.local === 'true') {
    commit(types.SET_IS_LOCAL, true)
    window.localStorage.isLocal = true
  } else if (qs.local === 'false') {
    commit(types.SET_IS_LOCAL, false)
    window.localStorage.isLocal = false
  } else if (window.localStorage.isLocal) {
    commit(types.SET_IS_LOCAL, window.localStorage.isLocal)
  } else {
    // default to true
    window.localStorage.isLocal = true
    commit(types.SET_IS_LOCAL, true)
  }
  dispatch('getSessionInfo')
  // always pop up modal to ask for session info
  // commit(types.SET_NEEDS_SESSION, true)
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

// get REST API endpoint URLs for this environment
export const getEndpoints = async ({commit, state, rootState}) => {
  console.log('getting REST endpoints')
  try {
    const response = await axios.get(`${rootState.apiBase}/endpoints`)
    console.log('endpoints acquired:', response)
    console.log('storing endpoints info in state')
    // store vertical config in state
    commit(types.SET_ENDPOINTS, response.data)
  } catch (e) {
    console.log('failed to get endpoints:', e)
    // leave the default values in state
  }
}
