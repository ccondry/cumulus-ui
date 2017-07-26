import * as types from './mutation-types'
import axios from 'axios'
// export const addToCart = ({ commit }, product) => {
//   if (product.inventory > 0) {
//     commit(types.ADD_TO_CART, {
//       id: product.id
//     })
//   }
// }

export const shortenUrl = ({state, rootState}, {longUrl, callback}) => {
  var xhr = new window.XMLHttpRequest()
  var apiKey = rootState.tokens.createLink
  var apiPath = '//public.cxdemo.net/create-link'
  var apiUrl = apiPath + '?token=' + apiKey + '&longUrl=' + encodeURIComponent(longUrl)
  xhr.open('GET', apiUrl)
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log('shortenUrl: returned status ' + xhr.status)
      if (xhr.status === 200) {
        var shortUrl = JSON.parse(xhr.response).url
        console.log('shortened URL = ', shortUrl)
        console.log('entire response = ', xhr.response)
        callback(shortUrl)
      } else {
        console.log('failed to shorten URL: ', xhr)
      }
    }
  }
  xhr.send()
}

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
    let url = `${rootState.emailApiBase}/email`
    axios.post(url, data)
    .then(response => {
      resolve(response)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export const startChat = ({commit, state, rootState}, data) => {
  // open iframe
  // this.showChatIframe = true
  // open popup
  let url = 'http://cceece.dcloud.cisco.com/system/templates/chat/kiwi/chat.html?subActivity=Chat&entryPointId=1001&templateName=kiwi&languageCode=en&countryCode=US&ver=v11'
  url = addEceParameters(url, data)
  let w = 400
  let h = 600
  let top = (window.screen.height / 2) - (h / 2)
  let left = (window.screen.width / 2) - (w / 2)
  window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
  // window.resize('400', '600')
}

export const startCallback = ({commit, state, rootState}, data) => {
  // open iframe
  // this.showCallbackIframe = true
  // open popup
  let url = 'http://cceece.dcloud.cisco.com/system/templates/chat/kiwi/chat.html?subActivity=Chat&entryPointId=1001&templateName=kiwi&languageCode=en&countryCode=US&ver=v11'
  url = addEceParameters(url, data)
  let w = 400
  let h = 600
  let top = (window.screen.height / 2) - (h / 2)
  let left = (window.screen.width / 2) - (w / 2)
  window.open(url, '_blank', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`)
}

function addEceParameters (url, data) {
  return url + `&email_address=${data.email}&full_name=${encodeURIComponent(data.name)}&phone_number=${data.phone}&subject=${encodeURIComponent(data.subject)}&submit=true`
}
