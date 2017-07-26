<template>
  <div>
    <h4 style="background-color: lightgrey;">Activity {{ model.ACTIVITY_ID }} - {{ formattedTimestamp(model.WHEN_CREATED) }}</h4>
    <chat-message
    v-for="msg in model.parsedContent"
    :model="msg">
    </chat-message>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  name: 'chat-history-entry',
  components: {
    'chat-message': require('src/components/chat-message.vue')
  },
  props: {
    model: {
      type: Object
    }
  },
  methods: {
    formattedTimestamp (timestamp) {
      return moment.utc(timestamp)
      // .utcOffset(new Date().getTimezoneOffset())
      .fromNow()
    }
  }
}
</script>
