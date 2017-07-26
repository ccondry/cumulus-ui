<!-- Chat Bot -->
<template>
  <div>
    <div class="cmr-top-section">
      <p>Chatting: Virtual Assistant Bot</p>
      <label for="cmr-tab-toggle">
        <span class="cmr-close-link" title="Close">
        </span>
      </label>
    </div>
    <div class="cmr-bottom-section">
      <!-- Chat Content -->
      <div ref="chat" class="chat-bot" style="height: 20em; overflow-y: scroll;">

        <div v-for="entry in chatBotHistory" :class="'msg-' + entry.type">
          <p v-html="entry.message">
            <!-- {{ entry.message }} -->
          </p>
        </div>
      </div>
    </div>
    <!-- Chat input -->
    <form @submit.prevent="submit">
      <input ref="input" class="form-control" v-model="chatInput" style="margin: 0em 1em 1em 1em; width: 96%">
    </form>
  </div>
</template>

<script>
export default {
  name: 'chat-bot',
  props: {
    replies: {},
    delay: {
      default: 1400
    },
    chatLink: {}
  },
  data () {
    return {
      chatInput: '',
      chatBotHistory: []
    }
  },
  created () {
    // start the bot window off with the first message from the bot to the user
    this.addBotReply()
  },
  methods: {
    sendMessage (message) {
      //
      console.log('sending chat message: ', message)
      this.chatBotHistory.push({
        message,
        type: 'sent'
      })
      // delay and then add the next reply from the bot, if there are any
      setTimeout(this.addBotReply, this.delay)
    },
    submit (e) {
      if (this.chatInput.length) {
        this.sendMessage(this.chatInput)
        this.chatInput = ''
      }
    },
    addBotReply () {
      if (this.replies.length) {
        this.addReply(this.replies.shift())
        // did we send the last message?
        if (this.replies.length === 0) {
          // now send the link to open the ECE chat
          this.chatBotHistory.push({
            message: this.chatLink,
            type: 'received'
          })
        }
      }
    },
    addReply (messageArray) {
      console.log('sending chat reply from bot: ', messageArray)
      for (let message of messageArray) {
        if (typeof message === 'string') {
          this.chatBotHistory.push({
            message,
            type: 'received'
          })
        } else if (typeof message === 'function') {
          this.chatBotHistory.push({
            message: message(),
            type: 'received'
          })
        }
      }
    }
  },
  watch: {
    chatBotHistory (val, oldVal) {
      // chat history was updated
      // scroll to the bottom of the chat log
      let container = this.$refs.chat
      // DOM is not updated yet
      this.$nextTick(function () {
        // DOM is now updated
        // `this` is bound to the current instance
        container.scrollTop = container.scrollHeight
      })
    },
    chatBotStarted (val, oldVal) {
      if (val === true) {
        // chat has started
        // put first reply into the chat window
        this.addReply(this.replies.shift())
      }
    },
    showChatBot (val, oldVal) {
      if (val === true) {
        // chat shown
        // check if this is the first time
        if (this.chatBotStarted === false) {
          this.chatBotStarted = true
        }
        // focus the chat input after it is rendered
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
    }
  }
}
</script>

<style>
.msg-sent, .msg-received {
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  max-width: 60%;
  clear: both;
}

.msg-sent a, .msg-received a {
  text-decoration: underline !important;
  color: royalblue !important;
}

.msg-sent {
  background-color: lightblue;
  position: relative;
  float: right;
}

.msg-received {
  background-color: lightgrey;
}
</style>
