<template>
  <div>
    <div v-if="model.mMsg">
      <div>
        {{ parsedUser }} ({{ userType }}): <span v-html="parsedMessage"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-message',
  props: {
    model: {}
  },
  computed: {
    parsedMessage () {
      if (this.model.mMsg) {
        return this.model.mMsg
        .replace(/\+/g, ' ')
        .replace(/\^0d\^0a/g, '<br />')
        .replace(/\^09/g, '\t')
        .replace(/\^2c/g, ',')
        .replace(/\^22/g, '"')
        .replace(/\^23/g, '#')
      } else {
        return ''
      }
    },
    parsedUser () {
      if (this.model.bUsr) {
        return this.model.bUsr
        .replace(/\+/g, ' ')
      } else {
        return ''
      }
    },
    userType () {
      if (this.model.bUserType) {
        switch (this.model.bUserType) {
          case 'CUST': return 'Customer'
          case 'SYSTEM': return 'System'
          case 'AGENT': return 'Agent'
        }
      } else {
        return ''
      }
    }
  }
}
</script>
