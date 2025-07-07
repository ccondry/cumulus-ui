<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="cancel">&times;</button>

        <div class="modal-header">
          <h3>Email an Expert</h3>
        </div>
        <form class="form-horizontal modal-body" role="form" @submit.prevent="submit">
          <div class="form-group">
            Your Name: <input class="form-control" v-model="fromName">
          </div>
          <div class="form-group">
            Your Email Address: <input class="form-control" v-model="fromAddress">
          </div>
          <div class="form-group">
            Subject: <input class="form-control" v-model="subject">
          </div>
          <div class="form-group">
            Message: <textarea class="form-control" v-model="body"></textarea>
          </div>
          <div class="form-group pull-right">
            <button type="submit" class="btn btn-default">Send</button>
          </div>
        </form>

        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'email-modal',
  props: ['initialEmail', 'initialName'],
  created () {
    this.fromAddress = this.initialEmail
    this.fromName = this.initialName
  },
  watch: {
    initialEmail (val, oldVal) {
      this.fromAddress = val
    },
    initialName (val, oldVal) {
      this.fromName = val
    }
  },
  data () {
    return {
      fromName: '',
      fromAddress: '',
      subject: '',
      body: '',
      working: false
    }
  },
  methods: {
    ...mapActions({
      sendEmail: 'sendEmail'
    }),
    submit () {
      console.log('submit')
      let fromAddress = this.fromAddress
      let fromName = this.fromName
      let body = this.body
      let subject = this.subject
      this.working = true
      this.sendEmail({
        fromAddress,
        fromName,
        body,
        subject,
        success: rsp => {
          this.working = false
        },
        fail: rsp => {
          this.working = false
        }
      })
      // dismiss the modal
      this.$emit('cancel')
    },
    cancel () {
      console.log('cancel')
      // dismiss the modal
      this.$emit('cancel')
    }
  }
}
</script>
