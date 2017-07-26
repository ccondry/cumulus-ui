<!-- Chat History window -->
<template>
  <div>
    <div ref="chat" class="chat-bot" style="height: 50em; overflow-y: scroll;">
      <div class="cmr-top-section">
        <p>Chat History</p>
        <label for="cmr-tab-toggle">
          <span class="cmr-close-link" title="Close"></span>
        </label>
      </div>
      <div class="cmr-bottom-section">
        <chat-history-entry
        v-for="chat in reversedChatHistory"
        :model="chat"></chat-history-entry>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

const moment = require('moment')

export default {
  name: 'chat-history',
  components: {
    'chat-history-entry': require('src/components/chat-history-entry')
  },
  computed: {
    ...mapGetters({
      chatHistory: 'chatHistory'
    }),
    sortedChatHistory () {
      return this.chatHistory.sort((a, b) => {
        return moment(a.WHEN_CREATED) - moment(b.WHEN_CREATED)
      })
    },
    reversedChatHistory () {
      return this.sortedChatHistory.reverse()
    }
  }
}
</script>
