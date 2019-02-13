<template>
  <header>
    <div id="top-header">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="home-account">
              <a href="#"></a>
            </div>
          </div>
          <div class="col-md-6">
            <a href="#" class="pull-right" :style="validSession ? '' : 'color: red'" @click.prevent="clickSession">{{ sessionLink }}</a>
          </div>
        </div>
      </div>
    </div>
    <div id="main-header">
      <div class="container">
        <div class="row">
          <div class="col-md-3">
            <router-link to="home">
              <div class="logo">
                <img v-if="model.logo && model.logo.rasterised" :src="model.logo.rasterised" :title="model.name" :alt="model.name" height="50">
                <!-- <img v-if="model.logo.image" :src="model.logo.image" :title="model.name" :alt="model.name">
                <svgicon v-if="!model.logo.image" icon="cumulus-logo" width="48" height="48" :color="model.logo.color"></svgicon>
                <div>
                  <div class="logo-title">
                    {{ model.logo.title }}
                  </div>
                  <div class="logo-subtitle" :style="`color: ${model.logo.color}`">
                    {{ model.logo.subtitle }}
                  </div>
                </div> -->
              </div>
            </router-link>
          </div>
          <div class="col-md-5">
            <div class="main-menu">
              <ul>
                <li><router-link to="home" class="nav-item">Home</router-link></li>
                <li><router-link to="about" class="nav-item">About</router-link></li>
                <li v-if="model.products && model.products.length"><router-link to="products" class="nav-item">Products</router-link></li>
                <!-- <li v-if="model.services && model.services.length"><router-link to="services" class="nav-item">Services</router-link></li> -->
                <li v-if="model.services && model.services.length"><a :href="servicesLink" class="nav-item">Services</a></li>
                <li><router-link to="contact" class="nav-item">Contact</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-md-2">
            <div class="search-box">
              <form name="search_form" method="get" class="search_form" @submit.prevent="">
                <input type="text" />
                <input type="submit" />
              </form>
            </div>
          </div>
          <div class="col-md-1 rem-support" v-if="cobrowseEnabled" >
            <a href @click.prevent="clickCobrowse"><img src="assets/cobrowsing.png" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- <a v-if="multichannelType === 'sfdc'" style="display: none;" href="#" ref="cblink" onclick="javascript: eGain.cobrowse.startCobrowse()"></a> -->
  </header>
</template>

<script>
import 'src/compiled-icons/cumulus-logo'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'vertical-header',
  props: ['model'],
  methods: {
    ...mapActions([
      'setNeedsSession',
      'getShortCode',
      'failNotification'
    ]),
    clickSession () {
      this.setNeedsSession(true)
    },
    clickAssist () {
      // pop modal to ask if they want cobrowse only or video call
      this.$emit('assist')
    },
    clickCobrowse () {
      console.log('click cobrowse button')
      // this.$refs.cblink.click()
      // console.log('document', document)
      if (document.eGain) {
        console.log('running document.eGain.cobrowse.startCobrowse()')
        document.eGain.cobrowse.startCobrowse()
      } else if (window.eGain) {
        console.log('running window.eGain.cobrowse.startCobrowse()')
        window.eGain.cobrowse.startCobrowse()
      } else {
        console.log('failed to start cobrowse - window.eGain and document.eGain are undefined.')
        this.failNotification('eGain cobrowse library failed to load. If you are using a browser outside of the demo workstations, please make sure you are connected to your demo VPN.')
      }
    }
  },
  computed: {
    ...mapGetters([
      'sessionId',
      'datacenter',
      'sessionInfo',
      'multichannelType',
      'sessionVersion'
    ]),
    cobrowseEnabled () {
      return this.multichannelType === 'ece' && this.sessionVersion !== '11.6v2'
    },
    validSession () {
      return Object.keys(this.sessionInfo).length
    },
    sessionLink () {
      if (this.datacenter && this.sessionId) {
        return `${this.datacenter} ${this.sessionId}`
      }
      return 'No Session'
    },
    servicesLink () {
      // generate the URL for the services page
      let url = 'https://mm.cxdemo.net/services'
      url += '?session=' + this.sessionId
      url += '&datacenter=' + this.datacenter
      if (this.$route.query.showAllVerticals) {
        url += '&showAllVerticals=' + this.$route.query.showAllVerticals
      }
      if (this.$route.query.username) {
        url += '&username=' + this.$route.query.username
      }
    }
  }
}
</script>

<style>
#top-header {
  background-color: #333;
  color: #fff;
}

/*-- #main-header {
background-color: #333;
}
--*/
.home-account a {
  display: inline-block;
  margin-right: 15px;
  padding: 10px 0;
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
}

.cart-info {
  text-align: right;
  padding: 8px 0;
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
}

.logo {
  padding: 20px 0;
  display: inline-flex;
  font-family: "CiscoSans", Arial, Helvetica, "Helvetica Neue", "HelveticaNeue", "Lucida Grande", sans-serif !important;
  font-weight: 200;
}

.logo-title {
  color: #333333;
  font-size: 2em;
}

.logo-subtitle {
  margin-top: -0.8em;
  text-align: center;
  font-weight: 400;
}

.main-menu ul {
  padding: 0px;
  margin: 0px;
  text-align: center;
}

.main-menu li {
  list-style: none;
  display: inline-block;
  padding: 40px 0;
}

.main-menu a {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #444;
  text-transform: uppercase;
  margin-right: 35px;
}

.main-menu a:hover {
  color: #7ac253;
}

.search-box {
  text-align: right;
  margin-top: 33px;
  position: relative;
}

.search-box input {
  margin-top: 0px;
}

.search-box input[type="submit"] {
  background-color: transparent;
  position: absolute;
  width: 34px;
  height: 26px;
  right: 0;
  top: 0;
  border: 0;
  content: '';
  color: transparent;
  background: url(/static/images/cumulus/common/search-icon.png);
  background-position: center;
  background-repeat: no-repeat;
}

.search-box input#s {
  padding: 4px 10px 4px 10px;
  height: 34px;
  line-height: 34px;
  outline: 0;
  border: 1px solid #ddd;
}

.rem-support a {
  color: #05407c;
  font-size: 1.6em;
}

.rem-support img {
  width: 6em;
  margin-top: 0.6em;
}
</style>
