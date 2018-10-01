// export const cartProducts = state => {
//   return state.cart.added.map(({ id, quantity }) => {
//     const product = state.products.all.find(p => p.id === id)
//     return {
//       title: product.title,
//       price: product.price,
//       quantity
//     }
//   })
// }

// current software version
export const version = state => state.version
// the base URL string to use for API calls
export const apiBase = state => state.apiBase
// string ID of the current vertical (travel, retail, banking, etc.)
export const vertical = state => state.vertical
// list of all verticals
export const verticals = state => state.verticals
// site contact details (phone number, mailing address, email)
export const contact = state => state.contact
// vertical configuration for site
export const verticalConfig = state => state.verticalConfig
// working state
export const working = state => state.working
// loading state
export const loading = state => state.loading

export const sessionId = state => state.sessionId
export const datacenter = state => state.datacenter
export const needsSession = state => state.needsSession
export const sessionInfo = state => state.sessionInfo

export const sessionDemo = (state, rootState, getters) => {
  // check UCCX or PCCE
  try {
    let demoType
    // determine if the demo is an array or string
    if (Array.isArray(getters.sessionInfo.demo)) {
      demoType = getters.sessionInfo.demo.pop()
    } else {
      demoType = getters.sessionInfo.demo
    }
    // check if UCCX
    if (demoType.toLowerCase() === 'uccx') {
      return 'uccx'
    } else {
      // PCCE 11.6 v2 and on
      return 'pcce'
    }
  } catch (e) {
    // default to PCCE
    return 'pcce'
  }
}

// user-defined session configuration
export const sessionConfig = (state, rootState, getters) => {
  try {
    return getters.sessionInfo.configuration || {}
  } catch (e) {
    return {}
  }
}

// user-defined multichannel type
export const multichannelType = function (state, rootState, getters) {
  try {
    // try to return user-configured value
    return getters.sessionInfo.configuration.multichannel.toLowerCase()
  } catch (e) {
    // use defaults
    if (getters.sessionDemo === 'uccx') {
      return 'socialminer'
    } else {
      return 'ece'
    }
  }
}

// the destination email address for sending email to the demo
// TODO fix this? seems that getters don't cascade?
// export const demoEmailAddress = (state, rootState, getters) => {
//   if (getters.sessionDemo === 'pcce') {
//     // PCCE demo
//     // check for UWF/SFDC/ECE config
//     if (getters.multichannelType === 'upstream') {
//       // UpstreamWorks for Finesse
//       return 'cumulusuwf'
//     } else if (getters.multichannelType === 'sfdc') {
//       // Bucher+Suter SFDC
//       return 'cumulussfdc'
//     } else {
//       // default to ECE
//       return 'cumulus'
//     }
//   } else if (getters.sessionDemo === 'uccx') {
//     // UCCX demo
//     return 'cumulus'
//   } else {
//     // unknown demo type
//     console.log('unknown demo type found:', demoType)
//     return 'cumulus'
//   }
// }

export const sessionVersion = (state, rootState, getters) => {
  // check UCCX or PCCE
  if (getters.sessionInfo.version) {
    // UCCX or PCCE 11.6 v2 or newer
    return getters.sessionInfo.version
  } else {
    // old PCCE 11.6 v1
    return '11.6v1'
  }
}

export const isLocal = state => state.isLocal

export const dCloudSparkyUrl = state => {
  return state.endpoints.sparky
}

export const dCloudEceChatUrl = state => {
  if (state.sessionInfo === null) {
    return null
  } else {
    // if (state.isLocal === false) {
    //   return `http://${state.sessionInfo.dns}/ece/system/templates/chat/cumulus/chat.html?subActivity=Chat&entryPointId=1001&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
    // } else {
    //   return `http://cceece.dcloud.cisco.com/system/templates/chat/cumulus/chat.html?subActivity=Chat&entryPointId=1001&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
    // }
    return `${state.endpoints.eceProxy}/${state.datacenter}-${state.sessionId}/system/templates/chat/cumulus/chat.html?subActivity=Chat&entryPointId=1001&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
  }
}

export const upstreamChatUrl = state => {
  try {
    return `${state.endpoints.upstreamProxy}/${state.datacenter}-${state.sessionId}/`
  } catch (e) {
    return ''
  }
}

export const dCloudEceCallbackUrl = state => {
  if (state.sessionInfo === null) {
    return null
  } else {
    // if (state.isLocal === false) {
    //   return `http://${state.sessionInfo.dns}/ece/system/templates/callback/cumulus/call.html?subActivity=Chat&entryPointId=1002&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
    // } else {
    //   return `http://cceece.dcloud.cisco.com/system/templates/callback/cumulus/call.html?subActivity=Chat&entryPointId=1002&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
    // }
    return `${state.endpoints.eceProxy}/${state.datacenter}-${state.sessionId}/system/templates/callback/cumulus/call.html?subActivity=Chat&entryPointId=1002&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
  }
}

export const egainWssUrls = state => {
  if (state.sessionInfo === null) {
    return null
  } else {
    // if (state.isLocal === false) {
    //   return state.sessionInfo.urls.wss.external
    // } else {
    return state.sessionInfo.urls.wss.internal
    // }
    // return `https://mm-egain.cxdemo.net/${state.datacenter}-${state.sessionId}/system/templates/selfservice/cumulus_knowledge/help/customer/locale/en-US/portal/200100000001000`
  }
}
