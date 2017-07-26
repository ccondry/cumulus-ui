<template>
  <div class="alert" :class="model.type ? 'alert-' + model.type : 'secondary'" transition="fade">
    <button @click="triggerClose" class="close" aria-label="Close alert" type="button">
      <span aria-hidden="true">&times;</span>
    </button>
    <h5 v-if="model.title">{{ model.title }}</h5>
    <p v-html="model.text"></p>
  </div>
</template>

<style>
.notification p {
  margin-right: 20px;
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'notification',
  props: ['model'],
  data: function () {
    return {
      timer: null
    }
  },
  created () {
    let timeout = this.model.hasOwnProperty('timeout') ? this.model.timeout : true
    if (timeout) {
      let delay = this.model.delay || 8000
      this.timer = setTimeout(function () {
        this.triggerClose(this.model)
      }.bind(this), delay)
    }
  },
  methods: {
    ...mapActions({
      removeNotification: 'removeNotification'
    }),
    triggerClose: function () {
      clearTimeout(this.timer)
      this.removeNotification(this.model)
    }
  }
}
</script>
