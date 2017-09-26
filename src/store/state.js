import version from 'src/version.js'
import verticalConfig from 'src/data/cumulus/travel.json'
import config from 'src/config'

export default {
  version,
  apiBase: config.productionApiUrl,
  tokens: {
    createLink: 'l1mrf02vop6dkf3qjc6a2s016k7isf5mduqcs91e2k1slon8lh2ln6litlkgi5cmdiqcv8e4tivdgkpdas9kimgkul42pleh2dg04ol2g0gr'
  },
  needsAuthentication: false,
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
  sessionInfo: null
}
