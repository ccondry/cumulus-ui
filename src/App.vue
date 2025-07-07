<template>
  <div id="app">
    <notifications></notifications>
    <lightbox></lightbox>
    <vertical-header :model="verticalConfig" v-on:assist="showAssistModal = true" v-if="!needsSession && !upstream"></vertical-header>
    <keep-alive>
      <router-view v-if="!needsSession"></router-view>
    </keep-alive>
    <vertical-footer v-if="!needsSession && !upstream"></vertical-footer>
    <!-- Session & Datacenter Form -->
    <session-modal v-show="needsSession" v-if="!upstream"></session-modal>

  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import AppFooter from './components/app-footer.vue'
import notifications from './components/notifications/notifications.vue'
import VerticalHeader from './components/vertical-header.vue'
import VerticalFooter from './components/vertical-footer.vue'
import Lightbox from './components/lightbox.vue'
import SessionModal from './components/session-modal.vue'
import router from './router/index.js'

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
  },
  async mounted () {
    // get REST endpoints info
    await this.getEndpoints()
    console.log('vertical =', this.vertical)

    // load verticals list
    this.getVerticals()
    // see if session, datacenter, vertical are in queryString or localStorage
    this.checkSession(this.getQueryVars())
  },
  methods: {
    ...mapActions({
      getCustomer: 'getCustomer',
      createCsRequest: 'createCsRequest',
      addPod: 'addPod',
      successNotification: 'successNotification',
      failNotification: 'failNotification',
      checkLogin: 'checkLogin',
      logout: 'logout',
      setVertical: 'setVertical',
      setPlatform: 'setPlatform',
      setTitle: 'setTitle',
      getVerticals: 'getVerticals',
      checkSession: 'checkSession',
      getSessionInfo: 'getSessionInfo',
      getVerticalConfig: 'getVerticalConfig',
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
      // return true if client is viewing the /upstream route
      return router.app.$route.path === '/upstream'
    }
  },
  watch: {
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
