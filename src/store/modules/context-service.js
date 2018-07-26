import * as types from 'src/store/mutation-types'

// module state
const state = {
  customer: null,
  requestId: null
}

// getters
const getters = {
  customer: state => state.customer,
  customerName: state => {
    if (state.customer && state.customer !== null) {
      return state.customer.dataElements.Context_First_Name + ' ' + state.customer.dataElements.Context_Last_Name
    } else {
      return ''
    }
  }
}

// actions
const actions = {
  getCustomer ({commit, state, rootState}) {
    // console.log('getting customer from context service with email = ', rootState.authentication.authToken)
    // // get customer ID from context service
    // jQuery.ajax(`${rootState.apiBase}/demo/cs/customer/?q=${rootState.authentication.authToken}&field=query_string&token=${state.tokens.getCustomer}`)
    // .done(function (rsp) {
    //   console.log('got customers: ', rsp)
    //   // set customer ID in config object
    //   console.log('chose first customer: ', rsp[0])
    //   commit(types.SET_CUSTOMER, rsp[0])
    //   // set lab user ID in config object
    //   commit(types.SET_USERID, state.customer.dataElements.Context_Customer_External_ID)
    //   console.log('set config.userid = ', rootState.user.userid)
    // })
  },
  addPod ({commit, state, rootState}, {customer, requestId, mediaType, fieldsets, dataElements, notes, success}) {
    // customer = customer || state.customer
    // let postData = {
    //   'customerId': state.customer.customerId,
    //   'mediaType': mediaType || 'web',
    //   'dataElements': dataElements || {
    //     'Context_Notes': notes || 'Visited website',
    //     'Context_POD_Activity_Link': window.location.href,
    //     'Context_POD_Source_Cust_Name': state.customer.dataElements.Context_First_Name + ' ' + state.customer.dataElements.Context_Last_Name,
    //     'Context_POD_Source_Email': rootState.authentication.authToken
    //   },
    //   'requestId': requestId || state.requestId || '',
    //   'token': state.tokens.createPod,
    //   'fieldsets': fieldsets || ''
    // }
    //
    // jQuery.ajax({
    //   url: rootState.apiBase + '/demo/cs/pod/',
    //   data: JSON.stringify(postData),
    //   method: 'POST',
    //   contentType: 'application/json'
    // }).done(function (rsp) {
    //   console.log('created POD. response: ', rsp)
    //   if (typeof success === 'function') {
    //     success()
    //   }
    // })
  },
  createCsRequest ({commit, state, rootState}, {dataElements, callback}) {
    // let postData = {
    //   token: state.tokens.createRequest,
    //   dataElements
    // }
    // // send data to API server to create CS Request
    // jQuery.ajax({
    //   url: rootState.apiBase + '/demo/cs/request/',
    //   dataType: 'json',
    //   data: JSON.stringify(postData),
    //   method: 'POST',
    //   contentType: 'application/json'
    // }).done(function (rsp) {
    //   console.log('created Context Service Request. response: ', rsp)
    //   state.requestId = rsp.requestId
    //   if (typeof callback === 'function') {
    //     callback(rsp)
    //   }
    // })
  }
}

// mutations
const mutations = {
  [types.SET_CUSTOMER] (state, data) {
    state.customer = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
