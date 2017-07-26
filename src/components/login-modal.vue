<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="cancel">&times;</button>

        <div class="modal-header">
          <h3>Login</h3>
        </div>

        <form class="form-horizontal modal-body" role="form" @submit.prevent="submit">
          <div class="form-group">
            Please log in with your email address and password
          </div>
          <div class="form-group">
            Email: <input class="form-control" v-model="username">
          </div>
          <div class="form-group">
            Password: <input class="form-control" type="password" v-model="password">
          </div>
          <div class="form-group pull-right">
            <button type="submit" class="btn btn-default">Log In</button>
          </div>
        </form>

        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login-modal',
  data () {
    return {
      username: '',
      password: '',
      working: false
    }
  },
  methods: {
    ...mapActions({
      login: 'login',
      setNeedsAuthentication: 'setNeedsAuthentication'
    }),
    submit () {
      console.log('submit')
      let username = this.username
      let password = this.password
      this.working = true
      this.login({
        username,
        password,
        success: rsp => {
          this.working = false
        },
        fail: rsp => {
          this.working = false
        }
      })
    },
    cancel () {
      console.log('cancel')
      // dismiss the login prompt
      this.setNeedsAuthentication(false)
    }
  },
  computed: {
    ...mapGetters({
      needsAuthentication: 'needsAuthentication'
    })
  }
}
</script>
