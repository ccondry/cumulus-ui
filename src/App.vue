<template>
  <div id="app">
    <notifications></notifications>
    <lightbox></lightbox>
    <vertical-header :model="verticalConfig" v-on:assist="showAssistModal = true" v-if="!needsSession && !upstream"></vertical-header>
    <keep-alive>
      <router-view v-if="!needsSession"></router-view>
    </keep-alive>
    <vertical-footer v-if="!needsSession && !upstream"></vertical-footer>

    <!-- REM cobrowse short code display -->
    <!-- <cobrowse-modal
    :short-code="shortCode"
    v-show="showCobrowseModal"
    v-on:close="showCobrowseModal = false"></cobrowse-modal> -->

    <!-- <assist-modal
    v-show="showAssistModal"
    v-on:cobrowse="startCobrowse"
    v-on:close="showAssistModal = false"></assist-modal> -->

    <!-- Session & Datacenter Form -->
    <session-modal v-show="needsSession" v-if="!upstream"></session-modal>

  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppFooter from './components/app-footer'
import notifications from 'src/components/notifications/notifications.vue'
import VerticalHeader from 'src/components/vertical-header.vue'
import VerticalFooter from 'src/components/vertical-footer.vue'
import Lightbox from 'src/components/lightbox.vue'
import SessionModal from 'src/components/session-modal.vue'
// import AssistModal from 'src/components/assist-modal.vue'
// import CobrowseModal from 'src/components/cobrowse-modal.vue'
import router from './router.js'

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'app',
  components: {
    Navbar,
    AppFooter,
    notifications,
    VerticalHeader,
    VerticalFooter,
    Lightbox,
    SessionModal
    // AssistModal,
    // CobrowseModal
  },
  data () {
    return {
      // sidebarShown: false,
      // activeSession: false,
      // inSupport: false,
      // userEmail: '',
      // verticalSelect: ''
      // showAssistModal: false,
      // showCobrowseModal: false
    }
  },
  async mounted () {
    // watch scroll, to detect when to pop the menu out
    // window.addEventListener('keyup', this.handleKeyUp)

    // this.getSessionInfo()
    // get REST endpoints info
    await this.getEndpoints()

    // this.getVerticalConfig()

    // set up REM event handlers
    // try {
    //   window.AssistSDK.onConnectionEstablished = () => {
    //     this.connectionEstablished()
    //   }
    // } catch (e) {
    //   console.log('exception: ', e)
    // }
    // try {
    //   window.AssistSDK.onEndSupport = () => {
    //     this.supportEnded()
    //   }
    // } catch (e) {
    //   console.log('exception: ', e)
    // }
    // console.log('demo =', this.demo)
    console.log('vertical =', this.vertical)

    // load verticals list
    this.getVerticals()
    // see if session, datacenter, vertical are in queryString or localStorage
    this.checkSession(this.getQueryVars())
    // set up egain cobrowse
    // const onetagUrl = 'https://cloud-us.analytics-egain.com/onetag/EG16529739'
    // const documentDomain = document.domain
    // const cobrowseIframe = this.$refs.egcobrowse
    // cobrowseIframe.src = "javascript:var d=document.open();d.domain='" + documentDomain + "';void(0);"
    // const cobrowseDocument = this.$refs.egcobrowse.contentWindow.document
    // cobrowseDocument.open()._d = function () {
    //   let s = this.createElement('script')
    //   documentDomain && (this.domain = documentDomain)
    //   s.src = onetagUrl
    //   this.isEGFIF = !0
    //   this.body.appendChild(cobrowseIframe)
    // }
    // cobrowseDocument.write('<body onload="document._d();">')
    // cobrowseDocument.close()
  },
  destroyed () {
    // stop watching to avoid errors
    // window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions({
      getCustomer: 'getCustomer',
      createCsRequest: 'createCsRequest',
      addPod: 'addPod',
      // storeRemConfiguration: 'storeRemConfiguration',
      successNotification: 'successNotification',
      failNotification: 'failNotification',
      // supportEnded: 'supportEnded',
      // connectionEstablished: 'connectionEstablished',
      checkLogin: 'checkLogin',
      logout: 'logout',
      setVertical: 'setVertical',
      setPlatform: 'setPlatform',
      setTitle: 'setTitle',
      getVerticals: 'getVerticals',
      checkSession: 'checkSession',
      getSessionInfo: 'getSessionInfo',
      getVerticalConfig: 'getVerticalConfig',
      // getShortCode: 'getShortCode',
      getEndpoints: 'getEndpoints'
    }),
    getQueryVars () {
      // get URL query parameters
      let uri = window.location.href.split('?')
      if (uri.length === 2) {
        let vars = uri[1].split('&')
        let getVars = {}
        let tmp = ''
        vars.forEach(v => {
          tmp = v.split('=')
          if (tmp.length === 2) getVars[tmp[0]] = tmp[1]
        })
        return getVars
      }
    },
    isActive (path) {
      return this.$route.path === path
    },
    go (path) {
      this.$router.push(path)
    }
    // handleKeyUp (e) {
    //   switch (e.keyCode) {
    //     case 112: {
    //       this.logout()
    //       break
    //     }
    //     case 113: {
    //       window.AssistSDK.endSupport()
    //       break
    //     }
    //   }
    // },
    // addEndSupportGui () {
    //   console.log('addEndSupportGui')
    // },
    // dismissCidDisplay () {
    //   console.log('dismissCidDisplay')
    //   // },
    //   // supportEnded () {
    //   //   console.log('hey supportEnded')
    //   //
    // },
    // startCobrowse () {
    //   console.log('user wants cobrowse')
    //   // dismiss the assist modal
    //   this.showAssistModal = false
    //   // go get short code
    //   this.getShortCode()
    //   // now the watcher for short code should trigger the shortcode modal momentarily
    // }
  },
  computed: {
    ...mapGetters([
      'verticalConfig',
      'verticals',
      'needsSession',
      'datacenter',
      'sessionId',
      'vertical'
      // 'shortCode'
    ]),
    upstream () {
      // console.log('App.vue - this.router.route.path ===', router.app.$route.path)
      // return true if client is viewing the /upstream route
      return router.app.$route.path === '/upstream'
    }
  },
  watch: {
    // shortCode (val, oldVal) {
    //   // got short code, so pop the cobrowse modal
    //   this.showCobrowseModal = true
    // },
    demo (val, oldVal) {
      // update the platform ID in state
      this.setPlatform(val)
    },
    async vertical (val, oldVal) {
      // get the config for the new vertical
      await this.getVerticalConfig()
      // update the HTML page title
      this.setTitle(this.verticalConfig.name)
    },
    needsSession (val, oldVal) {
      if (val === false) {
        console.log('sessionId/datacenter changed. Getting session info.')
        this.getSessionInfo(router.app.$route.query.userId)
      }
    }
  }
}
</script>

<style>
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
</style>
