import * as types from 'src/store/mutation-types'
import axios from 'axios'
// import notifications from 'src/store/modules/notifications.js'

// module state
const state = {
  taskRequest: {
    token: 'sa9ngb47tnt0dd5ijrkl3pi5fa1j5kmcb6himqc5esgl5l5en2mo795bl3p5c6jdnarke60b7r2fc0gh71n48f51oavivalqdi4uvp23roeu',
    apiUrl: 'https://api.cxdemo.net/instance/pcce/demo/task-routing',
    feedId: 100040,
    scriptSelector: 'Default_UQ_Task'
  },
  agentRequest: {
    feedId: '100020',
    baseUrl: 'https://labs.cxdemo.net/demos/callback/dynamic.html',
    title: 'Cisco Callback'
  }
}

// getters
const getters = {
  callbackUrl: (state, getters, rootState) => `${state.agentRequest.baseUrl}?feed=${state.agentRequest.feedId}&title=${encodeURIComponent(state.agentRequest.title)}&user=${rootState.user.userid}`
}

// function Exception (message) {
//   this.message = message
//   this.name = 'Exception'
// }

// actions
const actions = {
  // startCallback ({getters}) {
  //   window.open(getters.callbackUrl, '_blank', 'width=400,height=500')
  // },
  setEmail ({commit, state}, email) {
    // commit to state
    commit(types.SET_EMAIL, email)
  },
  async createTaskRequest ({commit, state, rootState}, {title, description, userid, mediaType, cv1, cv2, success}) {
    let postData = {
      'token': state.taskRequest.token,
      'feedId': state.taskRequest.feedId,
      'task': {
        'name': rootState.authentication.authToken,
        'title': title || 'Credit Alert',
        'description': description || 'Credit Alert',
        'scriptSelector': state.taskRequest.scriptSelector,
        'tags': [],
        'variables': [{
          'name': 'user_user.id',
          'value': userid || rootState.contextService.customer.dataElements.Context_Customer_External_ID
        }, {
          'name': 'mediaType',
          'value': mediaType || 'web'
        }]
      }
    }
    // append cv1 variable only if cv1 is non-empty
    if (cv1 && cv1.length) {
      postData.task.variables.push({
        'name': 'cv_1',
        'value': cv1
      })
    }
    // append cv2 variable only if cv2 is non-empty
    if (cv2 && cv2.length) {
      postData.task.variables.push({
        'name': 'cv_2',
        'value': cv2
      })
    }

    try {
      // perform REST operation
      const rsp = await axios({
        url: state.taskRequest.apiUrl,
        method: 'POST',
        // params: params.qs,
        data: postData
      })
      console.log('created Task in SocialMiner. response: ', rsp)
      if (typeof success === 'function') {
        success(rsp)
      }
    } catch (e) {
      throw e
    }
  },
  agentRequest: function (sessionId) {
    return `//demos.cxdemo.net/callback/dynamic.html?title=${state.socialminer.title}&feed=${state.socialminer.feedId}&cv8=${sessionId}&logo=${encodeURIComponent(state.socialminers.logo)}&titleColor=${encodeURIComponent(state.socialminer.titleColor)}&hideTitle=${state.socialminer.hideTitle}&favicon=${encodeURIComponent(state.socialminer.favicon)}&buttonBackground=${encodeURIComponent(state.socialminer.buttonBackground)}`
  },
  startTask ({dispatch}, {success, fail}) {
    try {
      // let longUrl = window.location.href
      // dispatch('shortenUrl', {
      //   longUrl,
      //   callback: shortUrl => {
      dispatch('createTaskRequest', {
        mediaType: 'alert',
        cv1: 'Credit Alert',
        //       cv2: shortUrl,
        success
      })
      //   }
      // })
    } catch (e) {
      if (typeof fail === 'function') {
        fail(e)
      }
    }
  }
}

// mutations
const mutations = {
  [types.SET_EMAIL] (state, data) {
    state.userEmail = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
