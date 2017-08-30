<template>
  <div id="app">
    <notifications></notifications>
    <lightbox></lightbox>
    <div v-if="demo && vertical">
      <vertical-header :model="verticalConfig"></vertical-header>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <vertical-footer></vertical-footer>
    </div>
    <div v-else>
      <div v-if="demo">
        Choose a vertical:
        <select v-model="verticalSelect">
          <option disabled value="">Please Choose Vertical</option>
          <option v-for="vertical in verticals" :value="vertical.id">{{ vertical.name }}</option>

          <!-- <option value="city">Cumulus City</option>
          <option value="travel">Cumulus Travel</option>
          <option value="utility">Cumulus Utility</option>
          <option value="finance">Cumulus Finance</option>
          <option value="healthcare">Cumulus Healthcare</option> -->
        </select>
        <button
        class="btn btn-success"
        @click.prevent="go({ name: 'home', params: { demo: demo, vertical: verticalSelect }})"
        :disabled="verticalSelect === ''"
        >Go</button>
      </div>
      <div v-else>
        Choose your platform:
        <select v-model="platformSelect">
          <option disabled value="">Please Choose Platform</option>
          <option v-for="platform in platforms" :value="platform.id">{{ platform.name }}</option>
        </select>
        <button
        class="btn btn-success"
        @click.prevent="go({ name: 'vertical-select', params: { demo: platformSelect }})"
        :disabled="platformSelect === ''"
        >Go</button>

        <!-- Choose
        <router-link :to="{ path: '/pcce' }">PCCE</router-link>
        or
        <router-link :to="{ path: '/uccx' }">UCCX</router-link> -->
      </div>
    </div>
    <!-- Login Form -->
    <!-- <email-modal
    v-show="showEmailModal"
    :initialEmail="initialEmail"
    :initialName="initialName"
    ></email-modal> -->
    <!-- REM cobrowse short code display -->
    <!-- <cobrowse-modal
    :short-code="shortCode"
    v-show="showCobrowseModal"
    v-on:close="showCobrowseModal = false"></cobrowse-modal> -->

    <!-- Login Form -->
    <!-- <login-modal v-show="needsAuthentication"></login-modal> -->
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import AppFooter from './components/app-footer'
import notifications from 'src/components/notifications/notifications.vue'
import VerticalHeader from 'src/components/vertical-header.vue'
import VerticalFooter from 'src/components/vertical-footer.vue'
import Lightbox from 'src/components/lightbox.vue'

import {mapGetters, mapActions} from 'vuex'

const platforms = [{
  name: 'dCloud PCCE',
  id: 'dcloud-pcce'
}, {
  name: 'dCloud UCCX',
  id: 'dcloud-uccx'
}, {
  name: 'CXDemo PCCE',
  id: 'cxdemo-pcce'
}, {
  name: 'CXDemo UCCX',
  id: 'cxdemo-uccx'
}]

export default {
  name: 'app',
  components: {
    Navbar,
    AppFooter,
    notifications,
    VerticalHeader,
    VerticalFooter,
    Lightbox
  },
  data () {
    return {
      sidebarShown: false,
      activeSession: false,
      inSupport: false,
      userEmail: '',
      verticalSelect: '',
      platformSelect: '',
      platforms
    }
  },
  created () {
    // watch scroll, to detect when to pop the menu out
    window.addEventListener('keyup', this.handleKeyUp)

    // update the HTML page title
    this.setTitle(this.verticalConfig.name)

    // see if user is logged in
    // this.checkLogin()

    // set up REM event handlers
    try {
      window.AssistSDK.onConnectionEstablished = () => {
        this.connectionEstablished()
      }
    } catch (e) {
      console.log('exception: ', e)
    }
    try {
      window.AssistSDK.onEndSupport = () => {
        this.supportEnded()
      }
    } catch (e) {
      console.log('exception: ', e)
    }
    console.log('demo =', this.demo)
    console.log('vertical =', this.vertical)

    // load verticals list
    this.getVerticals()
  },
  destroyed () {
    // stop watching to avoid errors
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions({
      getCustomer: 'getCustomer',
      createCsRequest: 'createCsRequest',
      addPod: 'addPod',
      storeRemConfiguration: 'storeRemConfiguration',
      successNotification: 'successNotification',
      failNotification: 'failNotification',
      supportEnded: 'supportEnded',
      connectionEstablished: 'connectionEstablished',
      checkLogin: 'checkLogin',
      logout: 'logout',
      setVertical: 'setVertical',
      setPlatform: 'setPlatform',
      setTitle: 'setTitle',
      getVerticals: 'getVerticals'
    }),
    submit (e) {
    },
    isActive (path) {
      return this.$route.path === path
    },
    go (path) {
      this.$router.push(path)
    },
    handleKeyUp (e) {
      switch (e.keyCode) {
        case 112: {
          this.logout()
          break
        }
        case 113: {
          window.AssistSDK.endSupport()
          break
        }
      }
    },
    addEndSupportGui () {
      console.log('addEndSupportGui')
    },
    dismissCidDisplay () {
      console.log('dismissCidDisplay')
      // },
      // supportEnded () {
      //   console.log('hey supportEnded')
      //
    }
  },
  computed: {
    ...mapGetters([
      'verticalConfig',
      'verticals'
    ]),
    // customer: 'customer',
    // needsAuthentication: 'needsAuthentication',
    // authToken: 'authToken'
    // }),
    vertical () {
      // pull the vertical ID from route
      return this.$route.params.vertical
    },
    demo () {
      // pull the demo type from route
      return this.$route.params.demo
    }
  },
  watch: {
    vertical (val, oldVal) {
      // update the vertical ID in state
      this.setVertical(val)
      // update the vertical data
      // console.log(this.$route.params.vertical)
    },
    demo (val, oldVal) {
      // update the platform ID in state
      this.setPlatform(val)
    }
    // authToken (val, oldVal) {
    //   if (val !== null) {
    //     // when the user authToken (email address) changes (login or re-login)
    //     // get customer info from Context Service
    //     this.getCustomer()
    //   }
    // }
    // customer (val, oldVal) {
    //   if (val !== null) {
    //     // set up CS Request data
    //     let dataElements = {
    //       'Context_Title': 'Customer Website Visit',
    //       'Context_Description': 'Authenticated customer is visiting ' + window.location.href
    //     }
    //     console.log('creating Context Service Request')
    //     // create CS Request
    //     this.createCsRequest({
    //       dataElements,
    //       callback: rsp => {
    //         this.$nextTick(function () {
    //           // add CS POD
    //           console.log('adding POD')
    //           this.addPod({
    //             notes: 'Visited website ' + window.location.href
    //           })
    //           // init REM library
    //           // window.AssistBoot.addAssistBehaviour()
    //           this.storeRemConfiguration()
    //         })
    //       }
    //     })
    //   }
    // }
  }
}
</script>
