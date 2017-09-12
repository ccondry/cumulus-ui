export default {
  gmapsApiKey: 'AIzaSyDPRyTrLw1tzRWR761gBCcmXoj7u4nRKxY',
  // productionApiUrl: '/api/v1',
  productionApiUrl: '/api/v1',
  rem: {
    destination: 'sip:7705@dcloud.cisco.com',
    url: 'https://rem1.dcloud.cisco.com:8443'
  },
  platform: {
    'dcloud-pcce': {
      ece: {
        chatUrl: 'http://cceece.dcloud.cisco.com/system/templates/chat/cumulus/chat.html?subActivity=Chat&entryPointId=1001&templateName=cumulus&languageCode=en&countryCode=US&ver=v11',
        callbackUrl: 'http://cceece.dcloud.cisco.com/system/templates/callback/cumulus/call.html?subActivity=Chat&entryPointId=1002&templateName=cumulus&languageCode=en&countryCode=US&ver=v11'
      },
      rem: {
        destination: 'sip:7705@dcloud.cisco.com',
        url: 'https://rem1.dcloud.cisco.com:8443'
      }
    },
    'cxdemo-pcce': {
      ece: {
        chatUrl: 'https://ece.cxdemo.net/system/templates/chat/kiwi/chat.html?subActivity=Chat&entryPointId=1001&templateName=kiwi&languageCode=en&countryCode=US&ver=v11',
        callbackUrl: 'https://ece.cxdemo.net/system/templates/callback/rainbow/call.html?subActivity=Callback&entryPointId=1002&templateName=rainbow&languageCode=en&countryCode=US&ver=v11'
      },
      emailApiUrl: '//api.dcloud.cisco.com',
      rem: {
        destination: 'sip:7005@cxdemo.net',
        url: 'https://rem2.cxdemo.net'
      }
    }
  }
}
