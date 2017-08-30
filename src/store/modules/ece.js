import * as types from 'src/store/mutation-types'
// function parseHistory (data) {
//   // console.log('ece chat history data returned = ' + JSON.stringify(data))
//   // pull CONTENT property out and begin parsing by splitting it at the object
//   // border. CONTENT is a serialized object.
//   let objects = decodeURIComponent(data.CONTENT).split('O{')
//   let content = [objects.length]
//
//   // iterate over the split objects
//   for (let i = 0; i < objects.length; i++) {
//     let properties = objects[i].split('}')
//     // console.log('properties', properties)
//     let niceProps = {}
//     for (let j = 0; j < properties.length; j++) {
//       let s = properties[j]
//       let marker1 = s.indexOf('+|+')
//       let key = s.substring(0, marker1)
//       let marker2 = marker1 + '+|+'.length
//       // let type = s.substring(marker2, marker2 + 1)
//       let value = s.substring(marker2 + 2, s.length)
//       if (key !== '') {
//         niceProps[key] = value
//       }
//     }
//     content[i] = niceProps
//   }
//   // assign parsed content to new property
//   data.parsedContent = content
//   // console.log('final content = ', content)
//   // return content
// }

const state = {
  server: 'ece.cxdemo.net',
  email: 'rockcoast3@gmail.com',
  toName: 'RockCoast',
  chatHistory: [],
  chatTemplate: 'kiwi-mc',
  languageCode: 'en',
  countryCode: 'US',
  chatEntryPointId: '1001',
  chatSubject: 'Hello',
  chatHistoryToken: 'hjrgd01id6nrj0dt39e9ev491sju4j6bj2rfdmivc8t31m8mm2lri163elm7qp35isd0isolgkpiqmg72hsojk5ts27dtdmr02os116ikgat',
  sendEmailToken: '9573cufdlrah8cihito2civ3fgb7fu2vg9bicol8r62qkvpe3p40r6hrvjjrf12nmclnfbgp1c96nr81g1q7ukgn1l2a52jg7d8hdc8p0vue',
  urls: {
    // video: () => {
    //   return `${state.urls.chat()}&video=1&avmode=2`
    // },
    // callNow: () => {
    //   return state.urls.chat()
    // },
    // callLater: () => {
    //   return state.urls.chat()
    // },
    cobrowse: () => {
      return `https://${state.server}/system/templates/cobrowse/sunburst/cobrowse.html`
    }
  },
  emailSubject: 'I have a question',
  emailBody: 'How can I get support? \r\n'
}

const getters = {
  chatUrl: (state, getters, rootState) => {
    let url = `https://${state.server}/system/templates/chat/${state.chatTemplate}/chat.html?subActivity=Chat&entryPointId=${state.chatEntryPointId}&templateName=${state.chatTemplate}&languageCode=${state.languageCode}&countryCode=${state.countryCode}&ver=v11`
    if (rootState.contextService.customer !== null) {
      url += `&full_name=${encodeURIComponent(rootState.contextService.customer.dataElements.Context_First_Name + ' ' + rootState.contextService.customer.dataElements.Context_Last_Name)}&email_address=${rootState.contextService.customer.dataElements.Context_Work_Email}&phone_number=${rootState.contextService.customer.dataElements.Context_Mobile_Phone}`
    }
    return url
  },
  eceEmail: state => state.email,
  chatHistory: state => state.chatHistory,
  emailUrl: state => `mailto:${state.email}?subject=${encodeURIComponent(state.emailSubject)}&body=${encodeURIComponent(state.emailBody)}`
}

const actions = {
  // startChat ({commit, state, getters, rootState, dispatch}, {autoStart = true, subject = 'Hello'}) {
  //   let newUrl = `${getters.chatUrl}&subject=${encodeURIComponent(subject)}&submit=${autoStart}`
  //   console.log('chat url = ', newUrl)
  //   window.open(newUrl, '_blank', '...')
  // },
  // startEmail ({commit, state, getters, rootState, dispatch}) {
  //   // add CS POD
  //   dispatch('addPod', {
  //     notes: 'Clicked to send an email for requesting an expert'
  //   })
  //   // open new email in OS
  //   console.log('emailUrl = ', getters.emailUrl)
  //   window.location.href = getters.emailUrl
  // },
  // sendEmail ({commit, state, getters, rootState, dispatch}, {body, subject, fromName, fromAddress, success, fail}) {
  //   // send email using API
  //   let formData = `body=${body}&subject=${subject}&fromName=${fromName}&fromAddress=${fromAddress}&toName=${state.toName}&toAddress=${state.email}&token=${state.sendEmailToken}`
  //
  //   jQuery.ajax({
  //     method: 'POST',
  //     url: rootState.apiBase + '/instance/pcce/demo/egain/email/send',
  //     data: formData,
  //     cache: false,
  //     contentType: 'application/x-www-form-urlencoded',
  //     processData: false
  //   }).done(function (rsp) {
  //     let message = 'Successfully sent email.'
  //     notifications.actions.successNotification({commit, state}, message)
  //     // run callback
  //     if (typeof success === 'function') {
  //       success(rsp)
  //     }
  //   }).fail(function (xhr, status, error) {
  //     let message = 'Failed to send email. The server returned the following error: ' + xhr.responseText
  //     notifications.actions.failNotification({commit, state}, xhr, message)
  //     // run callback
  //     if (typeof fail === 'function') {
  //       fail(xhr)
  //     }
  //   })
  // },
  // getChatHistory ({commit, state, rootState, rootGetters}) {
  //   jQuery.ajax(`${rootState.apiBase}/instance/pcce/demo/egain/chat/history?email=${rootGetters.authToken}&token=${state.chatHistoryToken}`)
  //   .done(function (rsp) {
  //     console.log('get chat history response:', rsp)
  //     for (let i in rsp) {
  //       parseHistory(rsp[i])
  //     }
  //     commit(types.SET_ECE_CHAT_HISTORY, rsp)
  //   })
  // }
}

const mutations = {
  [types.SET_ECE_CHAT_HISTORY] (state, data) {
    console.log('SET_ECE_CHAT_HISTORY', data)
    state.chatHistory = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
