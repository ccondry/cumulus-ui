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
            <a href="#" class="pull-right" :style="validSession ? '' : 'color: red'" @click.prevent="setNeedsSession">{{ datacenter }} {{ sessionId }} </a>
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
                <img v-if="model.logo.image" :src="model.logo.image" :title="model.name" :alt="model.name">
                <svgicon v-if="!model.logo.image" icon="cumulus-logo" width="48" height="48" :color="model.logo.color"></svgicon>
                <div>
                  <div class="logo-title">
                    {{ model.logo.title }}
                  </div>
                  <div class="logo-subtitle" :style="`color: ${model.logo.color}`">
                    {{ model.logo.subtitle }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-5">
            <div class="main-menu">
              <ul>
                <li><router-link to="home" class="nav-item">Home</router-link></li>
                <li><router-link to="about" class="nav-item">About</router-link></li>
                <li v-if="model.products && model.products.length"><router-link to="products" class="nav-item">Products</router-link></li>
                <li v-if="model.services && model.services.length"><router-link to="services" class="nav-item">Services</router-link></li>
                <li><router-link to="contact" class="nav-item">Contact</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-md-3">
            <div class="search-box">
              <form name="search_form" method="get" class="search_form" @submit.prevent="">
                <input id="search" type="text" />
                <input type="submit" id="search-button" />
              </form>
            </div>
          </div>
          <div class="col-md-1 rem-support">
            <a href @click.prevent="startRemCall"><img src="static/support.png" />Assist</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import 'src/compiled-icons/cumulus-logo'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'vertical-header',
  props: ['model'],
  methods: {
    ...mapActions({
      '_startRemCall': 'startRemCall',
      '_setNeedsSession': 'setNeedsSession'
    }),
    startRemCall () {
      this._startRemCall()
    },
    setNeedsSession () {
      this._setNeedsSession(true)
    }
  },
  computed: {
    ...mapGetters([
      'sessionId',
      'datacenter',
      'sessionInfo'
    ]),
    validSession () {
      return this.sessionInfo
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
  background: url(https://mm.cxdemo.net/static/images/cumulus/common/search-icon.png);
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
  width: 2.7em;
}
</style>
