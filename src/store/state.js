import version from 'src/version.js'
import verticalConfig from 'src/data/cumulus/travel.json'
// import config from 'src/config'

var apiBase = {
  'production': '/api/v1',
  'development': 'http://localhost:3025/api/v1'
  // 'development': 'https://mm-dev.cxdemo.net/api/v1'
}

export default {
  version,
  working: {},
  loading: {},
  apiBase: apiBase[process.env.NODE_ENV],
  tokens: {
    createLink: 'l1mrf02vop6dkf3qjc6a2s016k7isf5mduqcs91e2k1slon8lh2ln6litlkgi5cmdiqcv8e4tivdgkpdas9kimgkul42pleh2dg04ol2g0gr'
  },
  vertical: 'travel',
  verticals: [],
  contact: {
    phone: '+1 (408) 526-4000',
    address: '170 West Tasman Dr., San Jose, CA',
    email: 'info@cumulus.com'
  },
  verticalConfig,
  platform: null,
  platformConfig: null,
  datacenter: null,
  sessionId: null,
  needsSession: false,
  sessionInfo: {},
  isLocal: null,
  endpoints: {
    eceProxy: 'https://mm-ece.cxdemo.net',
    sparky: 'https://mm-chat.cxdemo.net',
    upstreamProxy: 'https://mm-uwf.cxdemo.net'
  }
}
