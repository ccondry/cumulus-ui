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

export const sessionId = state => state.sessionId
export const datacenter = state => state.datacenter
export const needsSession = state => state.needsSession
export const sessionInfo = state => state.sessionInfo
export const isLocal = state => state.isLocal

export const dCloudSparkyUrl = state => {
  return `https://mm-chat.cxdemo.net/`
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
    return `https://mm-ece.cxdemo.net/${state.datacenter}-${state.sessionId}/system/templates/chat/cumulus/chat.html?subActivity=Chat&entryPointId=1001&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
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
    return `https://mm-ece.cxdemo.net/${state.datacenter}-${state.sessionId}/system/templates/callback/cumulus/call.html?subActivity=Chat&entryPointId=1002&templateName=cumulus&languageCode=en&countryCode=US&ver=v11`
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
