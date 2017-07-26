<template>
  <!-- <div>
    <div class="navbar navbar-inverse navbar-fixed-top" v-bind:style="navStyle">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#" class="navbar-brand" rel="keep-params"><strong>{{ callType.name }}</strong></a>
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main" v-bind:style="navStyle">
          <ul class="nav navbar-nav">
            <li><a href="#" rel="keep-params" id="a_help">Help</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" id="a_log_in">Log In</a></li>
            <li><a href="#" id="a_sign_up">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div> -->
  <span>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/"><i class="icon-cisco"></i>dCloud Cisco Meeting Server</router-link>
        </div>
        <ul class="nav navbar-nav">
          <li :class="isActive('/cospace/create') ? 'active' : ''">
            <router-link to="/cospace/create">Create Cospace</router-link>
          </li>
          <li :class="isActive('/cospace/reset-passcode') ? 'active' : ''">
            <router-link to="/cospace/reset-passcode">Reset Passcode</router-link>
          </li>
          <li :class="isActive('/cospace/manage') ? 'active' : ''">
            <router-link to="/cospace/manage">Manage Cospaces</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </span>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    isActive (path) {
      return this.$route.path === path
    }
  }
}
</script>
