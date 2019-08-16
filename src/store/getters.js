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
export const userId = state => state.userId

export const isLocal = state => state.isLocal
export const showAllVerticals = state => state.showAllVerticals

export const sessionDemo = (state, getters, rootState) => {
  // demo type - uccx, pcce, cjp
  return getters.sessionInfo.demo
}

// user-defined session configuration
export const sessionConfig = (state, getters, rootState) => {
  try {
    return getters.sessionInfo.configuration || {}
  } catch (e) {
    return {}
  }
}

// user-defined multichannel type
export const multichannelType = function (state, getters, rootState) {
  try {
    // try to return user-configured value
    return state.multichannelType || getters.sessionInfo.configuration.multichannel.toLowerCase()
  } catch (e) {
    // use defaults
    if (state.sessionInfo.demo === 'uccx') {
      return 'socialminer'
    } else if (state.sessionInfo.demo === 'cjp') {
      return 'cconeemail'
    } else {
      return 'ece'
    }
  }
}

// is instant demo?
export const isInstantDemo = function (state, getters, rootState) {
  return getters.sessionInfo.instant
}

// the destination email address for sending email to the demo
// TODO fix this? seems that getters don't cascade?
// export const demoEmailAddress = (state, getters, rootState) => {
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

export const sessionVersion = (state, getters, rootState) => {
  // check UCCX or PCCE
  try {
    // UCCX or PCCE 11.6 v2 or newer
    return getters.sessionInfo.version
  } catch (e) {
    // old PCCE 11.6 v1
    return '11.6v1'
  }
}

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

export const tunnelHost = state => {
  try {
    return state.endpoints.tunnel
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
  try {
    return state.sessionInfo.urls.wss.internal
  } catch (e) {
    return null
  }
}

// is UCCX bubble chat enabled
export const useBubbleChat = (state, getters, rootState) => {
  try {
    // enabled by default for 12.0v2
    if (getters.sessionDemo === 'uccx') {
      console.log('useBubbleChat: is uccx')
      if (getters.sessionVersion === '12.0v2') {
        // is vertical config for bubble chat set to false?
        console.log('useBubbleChat: is uccx 12.0v2')
        if (getters.verticalConfig.uccxBubbleChat === false) {
          // disabled
          console.log('useBubbleChat: getters.verticalConfig.uccxBubbleChat === false')
          return false
        } else {
          // enabled
          console.log('useBubbleChat: getters.verticalConfig.uccxBubbleChat ===', getters.verticalConfig.uccxBubbleChat)
          return true
        }
      } else if (getters.verticalConfig.uccxBubbleChat === true) {
        // not 12.0v2 but user enabled it
        if (getters.sessionVersion === '12.0v1') {
          // allow user to enable for 12.0v1
          return true
        } else {
          // 11.6v3
          // don't allow user to enable it on 11.6v3 because I don't think it works
          return false
        }
      } else {
        console.log('useBubbleChat: getters.verticalConfig.uccxBubbleChat === false')
      }
    } else {
      console.log('useBubbleChat: not uccx, so disabled.')
      // not uccx - disabled
      return false
    }
  } catch (e) {
    console.log('error evaluating getter useBubbleChat:', e)
    // default to false if error
    return false
  }
}

export const dids = (state, getters) => {
  try {
    return getters.sessionInfo.dids
  } catch (e) {
    return {}
  }
}

export const cwccDid = (state, getters) => {
  // for CWCC demo, determine main phone number based on vertical selected
  switch (getters.sessionConfig.vertical) {
    case 'finance': return getters.dids.DID7
    case 'travel': return getters.dids.DID8
    case 'healthcare': return getters.dids.DID9
    case 'city': return getters.dids.DID5
    case 'utility': return getters.dids.DID10
    default: return getters.dids.DID7
  }
}

// is this a Cisco Webex Contact Center demo?
export const isCwcc = (state, getters) => {
  try {
    return getters.sessionInfo.demo.toLowerCase() === 'cwcc'
  } catch (e) {
    return false
  }
}

// is this a Cisco Webex Contact Center v1 demo?
export const isCwccV1 = (state, getters) => {
  try {
    return getters.sessionInfo.demo.toLowerCase() === 'cwcc' && state.sessionInfo.version.toLowerCase() === 'v1'
  } catch (e) {
    return false
  }
}
