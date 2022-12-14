import * as types from './mutation-types'
import axios from 'axios'
import notifications from './modules/notifications'

function popCconeChatWindow (data) {
  // cc one chat parameters
  const PROTOCOL = 'https'
  const IP = 'mm.ccone.net'
  const PORT = 443
  const EXCEPTION_MESSAGE = 'Unable to process your request.'
  const SHOW_EXCEPTION_DETAILS = false

  // init the CCOne chat system
  const chatAPI = new window.ThinConnectChat(PROTOCOL, IP, PORT, EXCEPTION_MESSAGE, SHOW_EXCEPTION_DETAILS)

  // attach data
  const dataArr = []
  dataArr.push({ key: 'custname', value: data.name })
  dataArr.push({ key: 'mobilenum', value: data.phone })
  dataArr.push({ key: 'emailid', value: data.email })
  dataArr.push({ key: 'question', value: data.subject })
  dataArr.push({ key: 'reason', value: '546' })
  dataArr.push({ key: 'sendtranscript', value: 'false' })
  dataArr.push({ key: 'CUSTOM_MESSAGE', value: 'Unable to process your request.' })
  dataArr.push({ key: 'SHOW_EXCEPTION_DETAILS', value: false })
  dataArr.push({ key: 'REQUEST-ID', value: 0 })
  dataArr.push({ key: 'sourceUrl', value: '' })
  dataArr.push({ key: 'chatRsnSelMode', value: '' })
  dataArr.push({ key: 'websitePkey', value: '' })
  dataArr.push({ key: 'defaultChatReason', value: '' })
  dataArr.push({ key: 'traversalHistory', value: '' })
  dataArr.push({ key: 'customerId', value: '' })
  dataArr.push({ key: 'groupId', value: '' })

  dataArr.push({ key: 'data0', value: 'Cumulus Homepage' })
  dataArr.push({ key: 'data1', value: 'Model_X Diamond Customer' })
  dataArr.push({ key: 'data2', value: 'Finance Quote' })
  dataArr.push({ key: 'data3', value: '' })
  dataArr.push({ key: 'data4', value: '' })
  dataArr.push({ key: 'data5', value: '' })
  dataArr.push({ key: 'data6', value: '' })
  dataArr.push({ key: 'data7', value: '' })
  dataArr.push({ key: 'data8', value: '' })
  dataArr.push({ key: 'data9', value: '' })

  // pop the chat window
  chatAPI.submit(dataArr)
}

export const setFavicon = ({commit, state, rootState}, src) => {
  console.log('setFavicon to', src)
  /*
  * Dynamically changing favicons with JavaScript
  * Works in all A-grade browsers except Safari and Internet Explorer
  * Demo: http://mathiasbynens.be/demo/dynamic-favicons
  */
  var link = document.createElement('link')
  var oldLink = document.getElementById('dynamic-favicon')
  link.id = 'dynamic-favicon'
  link.rel = 'shortcut icon'
  link.type = 'image/x-icon'
  link.href = src
  if (oldLink) {
    console.log('removing old favicon', oldLink)
    document.head.removeChild(oldLink)
  }
  console.log('adding favicon code to HTML head', link)
  document.head.appendChild(link)
}

export const getVerticalConfig = async ({commit, state, rootState, dispatch}) => {
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
      dispatch('setTitle', response.data.name)
      if (response.data.favicon) {
        console.log('response.data.favicon', response.data.favicon)
        dispatch('setFavicon', response.data.favicon)
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
  let response = await axios.get(`${rootState.apiBase}/verticals?all=true&summary=true`)
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
    // console.log(`state.isLocal = ${rootState.isLocal}`)
    let demoEmailAddress = 'cumulus'
    if (getters.multichannelType === 'upstream') {
      demoEmailAddress = 'cumulusuwf'
    }
    // for UCCX instant demo, use email like support_1234
    if (getters.isInstantDemo && getters.sessionDemo === 'uccx') {
      demoEmailAddress = 'support_' + getters.userId
    }
    console.log('sending email to', demoEmailAddress)
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
    // set TO address
    data.to = demoEmailAddress
    // set up request body
    body = {
      // to: demoEmailAddress,
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
  console.log('vuex action startChat')
  // check session is valid
  if (state.sessionInfo === null) {
    console.log('startChat failed - no session info found')
    // invalid session
    const message = `Your Session ID, ${state.sessionId} is not valid for the selected datacenter, ${state.datacenter}. Please update the information and try again.`
    notifications.actions.failNotification({commit, state}, message)
  } else {
    // valid session
    if (getters.sessionDemo === 'uccx') {
      // UCCX demo
      console.log('startChat uccx')
      if (getters.verticalConfig.uccxBubbleChat === true) {
        // bubble chat is enabled
        // use bubble chat!
        const smHost = getters.datacenter + '-' + getters.sessionId + '.tunnel.cc-dcloud.com'
        const widgetId = getters.sessionConfig.widgetId || '3'
        const ciscoBubbleChat = window.initBubbleChat(smHost, widgetId)
        ciscoBubbleChat.showChatWindow()
        return
      } else {
        // bubble chat was not specifically enabled
        // use the old sparky chat
        // open chat bot window with bot = false
        // open popup
        let url = addSparkyChatParameters(getters.dCloudSparkyUrl, getters.datacenter, getters.sessionId, data, getters.userId)
        console.log('chat bot URL:', url)
        // add bot = false to sparky URL
        url += '&botEnabled=false'
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        return
      }
    } else if (getters.sessionDemo === 'ccone') {
      // CJP demo
      popCconeChatWindow(data)
    } else if (getters.sessionDemo === 'pcce') {
      console.log('startChat pcce')
      // PCCE mode
      // check which multichannel is set up
      if (getters.multichannelType === 'ece') {
        console.log('opening ECE chat form')
        // open popup
        let url = addEceChatParameters(getters.dCloudEceChatUrl, data)
        console.log('ECE URL:', url)
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        // window.resize('400', '600')
        return
      } else if (getters.multichannelType === 'upstream') {
        console.log('opening upstream chat form')
        // open popup
        let url = addUpstreamChatParameters('/upstream?session=' + getters.sessionId + '&datacenter=' + getters.datacenter, data)
        console.log('Upstream URL:', url)
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        // window.resize('400', '600')
        return
      } else if (getters.multichannelType === 'sfdc') {
        // TODO implement this
        console.log('this is where we would open SFDC chat form')
        return
      } else {
        console.log('startChat using default multichannel for PCCE - ECE. getters.multichannelType was', getters.multichannelType)
        console.log('opening ECE chat form')
        // open popup
        let url = addEceChatParameters(getters.dCloudEceChatUrl, data)
        console.log('ECE URL:', url)
        let w = 400
        let h = 600
        let top = (window.screen.height / 2) - (h / 2)
        let left = (window.screen.width / 2) - (w / 2)
        window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
        // window.resize('400', '600')
        return
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
    let url = addSparkyChatParameters(getters.dCloudSparkyUrl, getters.datacenter, getters.sessionId, data, getters.userId)
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
      // UCCX web callback
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
      if (getters.multichannelType === 'ece') {
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
      } else {
        // not ECE multichannel - use SocialMiner Agent Request API
        try {
          const url = `${rootState.apiBase}/callback`
          const body = {
            session: rootState.sessionId,
            datacenter: rootState.datacenter,
            callback: {
              description: data.subject,
              name: data.firstName + ' ' + data.lastName,
              title: data.subject,
              mediaAddress: data.phone,
              tags: '',
              variables: []
            }
          }
          console.log(`sending callback request to ${url}`)
          commit(types.SET_WORKING, {key: 'callback', value: true})
          const response = await axios.post(url, body)
          console.log('callback response', response)
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
      }
    }
  }
}

/*
add URL query parameters to the chat URLs to pass customer data, for
bypassing the pre-chat forms
*/
function addEceChatParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&fieldname_3=${data.phone}&fieldname_4=${encodeURIComponent(data.subject)}`
}

function addSparkyChatParameters (url, datacenter, session, data, userId) {
  return url + `?firstName=${encodeURIComponent(data.firstName)}&lastName=${encodeURIComponent(data.lastName)}&email=${encodeURIComponent(data.email)}&userId=${userId}&phone=${data.phone}&session=${session}&datacenter=${datacenter}`
}

function addEceCallbackParameters (url, data) {
  return url + `&fieldname_1=${encodeURIComponent(data.name)}&fieldname_2=${data.email}&fieldname_3=${data.phone}&fieldname_4=0&fieldname_5=${encodeURIComponent(data.subject)}`
}

function addUpstreamChatParameters (url, data) {
  return url + `&name=${encodeURIComponent(data.name)}&email=${data.email}&phone=${data.phone}&message=${encodeURIComponent(data.subject)}`
}

import router from '../router.js'

export const setSession = ({commit, state, rootState}, data) => {
  console.log('setting session ID to ', data.sessionId)
  commit(types.SET_SESSION_ID, data.sessionId)
  // save in localStorage
  window.localStorage.sessionId = data.sessionId

  console.log('setting datacenter to ', data.datacenter)
  commit(types.SET_DATACENTER, data.datacenter)
  // save in localStorage
  window.localStorage.datacenter = data.datacenter

  console.log('setting vertical to ', data.vertical)
  commit(types.SET_VERTICAL, data.vertical)
  // save in localStorage
  window.localStorage.vertical = data.vertical

  console.log('setting showAllVerticals to ', data.showAllVerticals)
  commit(types.SET_SHOW_ALL_VERTICALS, data.showAllVerticals)
  // save in localStorage
  window.localStorage.showAllVerticals = data.showAllVerticals
  // set query string
  const query = {
    session: data.sessionId,
    datacenter: data.datacenter,
    // vertical: data.vertical,
    showAllVerticals: data.showAllVerticals
    // config: data.sessionId
  }
  // attach userId, if it exists
  if (rootState.userId) {
    query.userId = rootState.userId
  }
  router.app.$router.replace({
    query
  })
}

// check localStorage for site config data, and load into state if found
export const checkSession = ({state, commit, dispatch}, qs) => {
  console.log('query string =', qs)
  console.log('window.localStorage.sessionId', window.localStorage.sessionId)
  // check localStorage for sessionId, and copy to state
  if (qs && qs.session) {
    commit(types.SET_SESSION_ID, qs.session)
    window.localStorage.sessionId = qs.session
  } else if (window.localStorage.sessionId) {
    commit(types.SET_SESSION_ID, window.localStorage.sessionId)
  } else {
    console.log('SET_NEEDS_SESSION window.localStorage.sessionId')
    // not set, we need to ask
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.datacenter', window.localStorage.datacenter)
  // check query string and localStorage for datacenter, and copy to state
  if (qs && qs.datacenter) {
    commit(types.SET_DATACENTER, qs.datacenter)
    window.localStorage.datacenter = qs.datacenter
  } else if (window.localStorage.datacenter) {
    commit(types.SET_DATACENTER, window.localStorage.datacenter)
  } else {
    console.log('SET_NEEDS_SESSION window.localStorage.datacenter')
    // not set, we need to ask
    commit(types.SET_NEEDS_SESSION, true)
  }

  console.log('window.localStorage.showAllVerticals', window.localStorage.showAllVerticals)
  console.log('typeof window.localStorage.showAllVerticals ===', typeof window.localStorage.showAllVerticals)
  // check localStorage for showAllVerticals, and copy to state
  if (qs && qs.showAllVerticals) {
    commit(types.SET_SHOW_ALL_VERTICALS, qs.showAllVerticals === 'true')
    window.localStorage.showAllVerticals = qs.showAllVerticals === 'true'
  } else if (window.localStorage.showAllVerticals !== undefined) {
    if (typeof window.localStorage.showAllVerticals === 'boolean') {
      commit(types.SET_SHOW_ALL_VERTICALS, window.localStorage.showAllVerticals)
    } else if (typeof window.localStorage.showAllVerticals === 'string' && window.localStorage.showAllVerticals === 'true') {
      console.log('window.localStorage.showAllVerticals is true string. setting state.showAllVerticals to boolean true')
      commit(types.SET_SHOW_ALL_VERTICALS, window.localStorage.showAllVerticals === 'true')
    } else {
      // leave false
    }
  } else {
    // not set, we need to ask
    // commit(types.SET_NEEDS_SESSION, true)
  }

  // check query string for multichannelType, and copy to state if it exists
  if (qs && qs.multichannel) {
    commit(types.SET_MULTICHANNEL_TYPE, qs.multichannel)
  }
  if (qs && qs.userId) {
    // set userId in state
    commit(types.SET_USER_ID, qs.userId)
    // set userId in local storage
    window.localStorage.userId = qs.userId
  } else if (window.localStorage.userId) {
    // userId is in local storage, so use that
    // set userId in state
    commit(types.SET_USER_ID, window.localStorage.userId)
  }
  // get get the session info now
  dispatch('getSessionInfo', state.userId)
  .then(r => {
    console.log('window.localStorage.vertical', window.localStorage.vertical)
    // check localStorage for vertical, and copy to state
    if (state.vertical) {
      // vertical already set from session info - do not change it now!
      // update localStorage
      window.localStorage.vertical = state.vertical
    } else if (qs && qs.vertical) {
      commit(types.SET_VERTICAL, qs.vertical)
      window.localStorage.vertical = qs.vertical
    } else if (window.localStorage.vertical) {
      commit(types.SET_VERTICAL, window.localStorage.vertical)
    } else {
      // not set, we need to ask
      // commit(types.SET_NEEDS_SESSION, true)
    }
  })

  // do we need to pop session modal to ask for vertical?
  // if (qs && qs.config === 'true') {
  //   // use the session configuration's vertical when we load session info
  //   commit(types.SET_USE_SESSION_VERTICAL, true)
  // } else {
  //   // not set, we need to ask
  //   commit(types.SET_NEEDS_SESSION, true)
  // }
}

export const setNeedsSession = ({commit, state, rootState}, data) => {
  commit(types.SET_NEEDS_SESSION, data)
}

export const getSessionInfo = async ({commit, state, rootState}, userId) => {
  console.log('getting session info')
  try {
    const response = await axios.get(`${rootState.apiBase}/datacenters/${rootState.datacenter}/sessions/${rootState.sessionId}?userId=${userId}`)
    console.log('session info acquired:', response)
    console.log('storing session info config in state')
    // store vertical config in state
    commit(types.SET_SESSION_INFO, response.data)
    // set up the voice call phone number
    try {
      // main demo IVR number
      commit(types.SET_CONTACT_PHONE, response.data.phone.international)
      // mobile app demo number
      commit(types.SET_CONTACT_MOBILE, response.data.mobile.international)
      // Jacada demo number
      commit(types.SET_CONTACT_JACADA, response.data.jacada.international)
      // PQ certification demo number
      commit(types.SET_CONTACT_PQ, response.data.pq.international)
      // upstream works demo number
      commit(types.SET_CONTACT_UWF, response.data.uwf.international)
      // conversational IVR demo number
      commit(types.SET_CONTACT_AI, response.data.ai.international)
    } catch (e1) {
      console.log(e1)
      // do nothing
    }
    try {
      // vertical is set in session configuration data?
      if (response.data.configuration.vertical) {
        console.log('using vertical in session configuration:', response.data.configuration.vertical)
        // use the session configuration's vertical when we load session info
        // commit(types.SET_USE_SESSION_VERTICAL, true)
        commit(types.SET_VERTICAL, response.data.configuration.vertical)
      } else if (!rootState.vertical || !rootState.vertical.length) {
        console.log('state.vertical is not set. prompting user with session modal.')
        // vertical not set, we need to ask the user for vertical
        console.log('SET_NEEDS_SESSION state.vertical')
        commit(types.SET_NEEDS_SESSION, true)
      }
    } catch (e) {
      console.log('session configuration does not contain vertical info')
      if (!rootState.vertical || !rootState.vertical.length) {
        console.log('state.vertical is not set. prompting user with session modal.')
        // vertical not set, we need to ask the user for vertical
        console.log('SET_NEEDS_SESSION state.vertical')
        commit(types.SET_NEEDS_SESSION, true)
      } else {
        console.log('state.vertical is already set to', rootState.vertical)
      }
    }
  } catch (e) {
    console.log('failed to get session info.', e)
    // set state data to empty object
    commit(types.SET_SESSION_INFO, {})
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
