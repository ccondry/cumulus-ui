import version from 'src/version.js'
import verticalConfig from 'src/data/cumulus/travel.json'
import config from 'src/config'

// var apiUrls = {
//   production: config.productionApiUrl,
//   // development: 'http://api.dcloud.cisco.com'
//   development: 'http://localhost:3000/api'
// }

export default {
  version,
  // apiBase: apiUrls[process.env.NODE_ENV],
  apiBase: config.productionApiUrl,
  emailApiBase: config.emailApiUrl,
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
  platform: '',
  platformConfig: null
}
