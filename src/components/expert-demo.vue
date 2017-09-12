<template>
  <span class="main-expand">
    <!-- Optional Header -->
    <div v-if="model.stickyHeader === true" class="sticky-header">
      <span style="display:inline-block;position:relative;"></span>
    </div>
    <iframe class="iframe-background" v-if="model.iframeEnabled" :src="model.iframeSrc"></iframe>
    <!-- Main Content -->
    <main role="main" aria-label="">
      <a v-bind:href="model.link1Href" :alt="model.link1Alt" class="my-links" id="link1"></a>
      <a v-bind:href="model.link2Href" :alt="model.link2Alt" class="my-links" id="link2"></a>
      <!-- Sidebar Control Element -->
      <input type="checkbox" id="cmr-tab-toggle" v-model="menuOpen">
      <label for="cmr-tab-toggle">
        <span class="cmr-module-tab" id="cmr-module-tab">Talk to an expert</span>
      </label>
      <!-- Sidebar Body -->
      <div id="cmr-module" class="cmr-panel">
        <!-- Main Menu -->
        <div v-if="showMainMenu">
          <div class="cmr-top-section">
            <p><slot name="menu-title">Need help?</slot></p>
            <label for="cmr-tab-toggle">
              <span class="cmr-close-link" title="Close">
              </span>
            </label>
          </div>
          <div class="cmr-bottom-section">
            <div v-show="model.advisorEnabled === true" class="advisor-block">
              <img src="//static.cxdemo.net/images/ming_advisor.png" style="height: 124px; padding-left: 3em;">
              <span style="float: right;">
                <h3>{{ model.advisorText }}</h3>
                <p>We're here to help</p>
              </span>
            </div>
            <div v-show="model.chatEnabled !== false" class="ibm-chat-btn cmr-block ibm-chat-available" @click="clickChat">
              <h2>Chat Now<small> - {{ waitText(model.chatWait) }}</small></h2>
              <p>An expert will chat with you live</p>
            </div>
            <div v-show="model.chatHistoryEnabled !== false" class="ibm-chat-btn cmr-block ibm-chat-available" @click="clickChatHistory">
              <h2>Chat History</h2>
              <p>Show your chat history</p>
            </div>
            <div v-show="model.textEnabled !== false" class="ibm-chat-btn cmr-block ibm-chat-available" @click="clickText">
              <h2>Text Us<small> - {{ waitText(model.textWait) }} </small></h2>
              <p>{{ formattedSmsNumber }}</p>
            </div>
            <div v-show="model.callEnabled !== false" id="phone-container" class="cmr-phone-container cmr-block" @click="clickCall">
              <h2>Call Us<small> - {{ waitText(model.callWait) }} </small></h2>
              <p>{{ formattedDemoDnis }}</p>
            </div>
            <div v-show="model.callbackEnabled !== false" class="cmr-callback-container cmr-block" @click="clickCallback">
              <h2>We'll Call You<small> - {{ waitText(model.callbackWait) }}</small></h2>
              <p>Receive a call back from an expert.</p>
            </div>
            <div v-show="model.emailEnabled !== false" id="cmr-email-container" class="cmr-email-container cmr-block" @click="clickEmail">
              <h2>Email an expert<small> - {{ waitText([model.emailWaitMin, model.emailWaitMax]) }}</small></h2>
              <p>An expert will respond to your email.</p>
            </div>
            <div v-show="model.taskEnabled !== false" class="cmr-task-container cmr-block" @click="clickTask">
              <h2>Route a Task</h2>
              <p>An expert will handle your task.</p>
            </div>
            <div v-show="model.trackingEnabled !== false" class="cmr-tracking-container cmr-block" @click="clickTracking">
              <h2>Add Tracking Info</h2>
              <p>An expert will receive tracking info from you.</p>
            </div>
            <div v-show="model.cobrowseEnabled !== false" class="cmr-cobrowse-container cmr-block" @click="clickCobrowse">
              <h2>Cobrowse<small> - {{ waitText(0) }}</small></h2>
              <p>An expert will cobrowse with you live.</p>
            </div>
            <div v-show="model.videoEnabled !== false" class="cmr-video-container cmr-block" @click="clickVideo">
              <h2>Live Video Assistance<small> - {{ waitText(model.videoWait) }}</small></h2>
              <p>An expert will help you live over video.</p>
            </div>
          </div>
        </div>
        <!-- Chat History -->
        <chat-history
        v-show="showChatHistory"
        :model="chatHistory"></chat-history>
        <!-- Chat Bot window -->
        <chat-bot
        v-if="model.chatBotEnabled"
        v-show="showChatBot"
        :replies="model.chatBotReplies"
        :chat-link="chatLink"></chat-bot>
      </div>
    </main>
    <!-- Optional Footer -->
    <div v-if="model.stickyFooter" class="sticky-footer">
      <span style="display:inline-block;position:relative;"></span>
    </div>
    <!-- Login Form -->
    <email-modal
    v-show="showEmailModal"
    :initialEmail="initialEmail"
    :initialName="initialName"
    ></email-modal>
    <!-- REM cobrowse short code display -->
    <cobrowse-modal
    :short-code="shortCode"
    v-show="showCobrowseModal"
    v-on:close="showCobrowseModal = false"></cobrowse-modal>
  </span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

// clean undefined entries
function removeUndefined (obj) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === undefined) delete obj[key]
  })
}

function eventFire (el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype)
  } else {
    var evObj = document.createEvent('Events')
    evObj.initEvent(etype, true, false)
    el.dispatchEvent(evObj)
  }
}

export default {
  name: 'expert-demo',
  components: {
    'email-modal': require('src/components/email-modal.vue'),
    'cobrowse-modal': require('src/components/cobrowse-modal.vue'),
    'chat-history': require('src/components/chat-history.vue'),
    'chat-bot': require('src/components/chat-bot.vue')
  },
  data () {
    return {
      model: {
        title: 'Cumulus',
        emailForm: false,
        stickyFooter: false,
        stickyHeader: false,
        chatEnabled: true,
        chatHistoryEnabled: true,
        textEnabled: true,
        callEnabled: true,
        callbackEnabled: true,
        emailEnabled: true,
        taskEnabled: true,
        trackingEnabled: true,
        videoEnabled: true,
        chatBotEnabled: false,
        advisorEnabled: false,
        advisorText: 'Expert Advisor',
        cobrowseEnabled: false,
        chatWait: 2,
        textWait: 2,
        callWait: 8,
        callbackWait: 8,
        emailWaitMin: 720,
        emailWaitMax: 1440,
        videoWait: 6,
        chatAutoStart: false,
        chatSubject: 'Hello',
        chatBotReplies: [['Please configure the chat bot replies.']],
        chatLinkText: 'Chat with Ming',
        iframeEnabled: false,
        iframeSrc: '',
        link1Href: '',
        link1Alt: '',
        link1Enabled: false,
        link2Href: '',
        link2Alt: '',
        link2Enabled: false,
        proactiveChatEnabled: true,
        proactiveChatTrigger: 800
      },
      menuOpen: false,
      showChatHistory: false,
      showEmailModal: false,
      showChatBot: false,
      showMainMenu: true,
      showCobrowseModal: false,
      scrollFired: false
    }
  },
  created () {
    // watch scroll, to detect when to pop the menu out
    window.addEventListener('scroll', this.handleScroll)
    console.log('scroll event listener added')
    // set initial style
    // try {
    //   // this.changeStyle()
    // } catch (e) {
    //   console.log('Caught Exception: ', e)
    // }
  },
  destroyed () {
    // stop watching to avoid errors
    window.removeEventListener('scroll', this.handleScroll)
    console.log('scroll event listener removed')
  },
  computed: {
    ...mapGetters({
      chatUrl: 'chatUrl',
      eceEmail: 'eceEmail',
      callbackUrl: 'callbackUrl',
      chatHistory: 'chatHistory',
      formattedSmsNumber: 'formattedSmsNumber',
      formattedDemoDnis: 'formattedDemoDnis',
      initialEmail: 'authToken',
      initialName: 'customerName',
      shortCode: 'shortCode',
      activeRemSession: 'activeRemSession',
      inRemSupport: 'inRemSupport',
      customer: 'customer'
    }),
    chatLink () {
      try {
        return `<a onclick="window.open('${this.chatUrl}&subject=${encodeURIComponent(this.model.chatSubject)}&submit=${this.model.chatAutoStart}', '_blank', '...')">${this.model.chatLinkText}</a>`
      } catch (e) {
        console.log('exception: ', e)
        return `<a onclick="window.open('${this.chatUrl}')">Chat with our expert</a>"`
      }
    }
  },
  methods: {
    ...mapActions({
      createTaskRequest: 'createTaskRequest',
      // shortenUrl: 'shortenUrl',
      addPod: 'addPod',
      startRemCall: 'startRemCall',
      getChatHistory: 'getChatHistory',
      sendSms: 'sendSms',
      startCall: 'startCall',
      successNotification: 'successNotification',
      startEmail: 'startEmail',
      startCallback: 'startCallback',
      startTask: 'startTask',
      startChat: 'startChat',
      changeFavicon: 'setFavicon',
      getShortCode: 'getShortCode'
    }),
    waitText (minutes) {
      if (typeof minutes === 'number' || typeof minutes === 'string') {
        if (minutes <= 0) {
          return 'no wait time'
        } else if (minutes < 60) {
          return minutes + ' min wait time'
        } else {
          return Math.round(Number(minutes / 60)) + ' hour wait time'
        }
      } else if (typeof minutes === 'object' && Array.isArray(minutes)) {
        // range
        return Math.round(Number(minutes[0] / 60)) + '-' + Math.round(Number(minutes[1] / 60)) + ' hour wait time'
      }
    },
    handleScroll (e) {
      // console.log(e)
      // console.log(window.scrollY)
      if (this.scrollFired === false && window.scrollY > this.model.proactiveChatTrigger) {
        this.openInteractionMenu()
        this.scrollFired = true
      }
    },
    openInteractionMenu () {
      // if the menu is closed
      if (!this.menuOpen) {
        // open interaction menu
        eventFire(document.getElementById('cmr-module-tab'), 'click')
        // mark menu as opened
        this.menuOpen = true
      }
    },
    ucode (i) {
      return String.fromCharCode(i)
    },
    clickChat () {
      console.log('click chat')
      if (this.model.chatBotEnabled) {
        // start chat bot
        this.showChatBot = true
      } else {
        // open ECE chat and show chat history
        this.startChat({
          autoStart: this.model.chatAutoStart,
          subject: ''
        })
        if (this.model.chatHistoryEnabled) {
          // load chat history from server
          this.getChatHistory()
          // open chat history
          this.showChatHistory = true
        }
      }
    },
    clickChatHistory () {
      console.log('click chat history')
      this.getChatHistory()
      this.showChatHistory = true
    },
    clickRefreshChatHistory () {
      console.log('click refresh chat history')
      this.getChatHistory()
    },
    clickText () {
      console.log('click text')
      this.sendSms()
    },
    clickCall () {
      console.log('click call')
      this.startCall()
    },
    clickCallback () {
      console.log('click callback')
      this.startCallback()
    },
    clickEmail () {
      console.log('click email')
      if (this.model.emailForm) {
        this.showEmailModal = true
      } else {
        this.startEmail()
      }
    },
    clickTask () {
      console.log('click task')
      this.startTask({
        success: (rsp) => {
          this.successNotification('Successfully sent task request.')
        }
      })
    },
    clickTracking () {
      console.log('click Add Tracking Info')
      this.addPod({
        notes: 'Customer added tracking info from URL ' + window.location.href,
        success: (rsp) => {
          this.successNotification('Successfully added tracking information.')
        }
      })
    },
    clickVideo () {
      console.log('click REM video')
      this.startRemCall()
    },
    clickCobrowse () {
      console.log('click Cobrowse')
      this.getShortCode()
    },
    endSupport () {
      window.AssistSDK.endSupport()
    },
    changeStyle (val) {
      console.log('in changeStyle')
      // using a generator function
      function* entries (obj) {
        for (let key of Object.keys(obj)) {
          yield [key, obj[key]]
        }
      }

      // an alternative version using a generator expression
      // function entries(obj) {
      //    return (for (key of Object.keys(obj)) [key, obj[key]])
      // }

      if (val && val !== null && val.style) {
        for (let [key, value] of entries(val.style)) {
          window.document.documentElement.style.setProperty(key, value)
        }
      }

      // change the favicon
      this.changeFavicon(val.favicon)

      // change the title
      document.title = val.title
    },
    updateModel (val) {
      console.log('in updateModel')
      // check for valid values
      if (val && val !== null) {
        // set up the new style model
        let model = {
          title: val.dataElements.Cumulus_Page_Title,
          favicon: val.dataElements.Cumulus_Favicon,
          style: {
            '--color-1': val.dataElements.Cumulus_Color_1,
            '--color-2': val.dataElements.Cumulus_Color_2,
            '--bg-height': val.dataElements.Cumulus_Background_Height,
            '--bg-width': val.dataElements.Cumulus_Background_Width,
            '--bg-margin': val.dataElements.Cumulus_Background_Margin,
            '--bg-img': val.dataElements.Cumulus_Background_Image,
            '--bg-img-expand': val.dataElements.Cumulus_Background_Image_Expand,
            '--bg-color': val.dataElements.Cumulus_Background_Color,
            '--bg-color-expand': val.dataElements.Cumulus_Background_Color_Expand,
            '--bg-size': val.dataElements.Cumulus_Background_Size,
            '--header-height': val.dataElements.Cumulus_Header_Height,
            '--header-img': val.dataElements.Cumulus_Header_Image,
            '--header-bg-color': val.dataElements.Cumulus_Header_Color,
            '--body-box-shadow': val.dataElements.Cumulus_Body_Box_Shadow,
            '--link-border': val.dataElements.Cumulus_Link_Border,
            '--link1-top': val.dataElements.Cumulus_Link1_Top,
            '--link1-left': val.dataElements.Cumulus_Link1_Left,
            '--link1-width': val.dataElements.Cumulus_Link1_Width,
            '--link1-height': val.dataElements.Cumulus_Link1_Height,
            '--link2-top': val.dataElements.Cumulus_Link2_Top,
            '--link2-left': val.dataElements.Cumulus_Link2_Left,
            '--link2-width': val.dataElements.Cumulus_Link2_Width,
            '--link2-height': val.dataElements.Cumulus_Link2_Height
          },
          link1Href: val.dataElements.Cumulus_Link1_Href,
          link1Alt: val.dataElements.Cumulus_Link1_Alt,
          link1Enabled: val.dataElements.Cumulus_Link1_Enabled,
          link2Href: val.dataElements.Cumulus_Link2_Href,
          link2Alt: val.dataElements.Cumulus_Link2_Alt,
          link2Enabled: val.dataElements.Cumulus_Link2_Enabled,
          emailForm: val.dataElements.Cumulus_Email_Form_Enabled,
          stickyFooter: val.dataElements.Cumulus_Footer_Enabled,
          stickyHeader: val.dataElements.Cumulus_Header_Enabled,
          chatEnabled: val.dataElements.Cumulus_Chat_Enabled,
          chatWait: val.dataElements.Cumulus_Chat_Wait,
          chatAutoStart: val.dataElements.Cumulus_Chat_Auto_Start,
          chatSubject: val.dataElements.Cumulus_Chat_Subject,
          chatHistoryEnabled: val.dataElements.Cumulus_Chat_History_Enabled,
          textEnabled: val.dataElements.Cumulus_SMS_Enabled,
          textWait: val.dataElements.Cumulus_SMS_Wait,
          textMessage: val.dataElements.Cumulus_SMS_Message,
          callEnabled: val.dataElements.Cumulus_Call_Enabled,
          callWait: val.dataElements.Cumulus_Call_Wait,
          callbackEnabled: val.dataElements.Cumulus_Callback_Enabled,
          callbackWait: val.dataElements.Cumulus_Callback_Wait,
          taskEnabled: val.dataElements.Cumulus_Task_Enabled,
          trackingEnabled: val.dataElements.Cumulus_Tracking_Enabled,
          videoEnabled: val.dataElements.Cumulus_Video_Enabled,
          videoWait: val.dataElements.Cumulus_Video_Wait,
          advisorEnabled: val.dataElements.Cumulus_Advisor_Enabled,
          advisorText: val.dataElements.Cumulus_Advisor_Text,
          cobrowseEnabled: val.dataElements.Cumulus_Cobrowse_Enabled,
          cobrowseWait: val.dataElements.Cumulus_Cobrowse_Wait,
          emailEnabled: val.dataElements.Cumulus_Email_Enabled,
          emailFormEnabled: val.dataElements.Cumulus_Email_Form_Enabled,
          emailSubject: val.dataElements.Cumulus_Email_Subject,
          emailBody: val.dataElements.Cumulus_Email_Body,
          emailWaitMin: val.dataElements.Cumulus_Email_Wait_Min,
          emailWaitMax: val.dataElements.Cumulus_Email_Wait_Max,
          chatBotEnabled: val.dataElements.Cumulus_Bot_Enabled,
          chatBotReplies: val.dataElements.Cumulus_Bot_Script,
          chatLinkText: val.dataElements.Cumulus_Bot_Link_Text,
          iframeEnabled: val.dataElements.Cumulus_Iframe_Enabled,
          iframeSrc: val.dataElements.Cumulus_Iframe_Source,
          proactiveChatEnabled: val.dataElements.Cumulus_Proactive_Chat_Enabled,
          proactiveChatTrigger: val.dataElements.Cumulus_Proactive_Chat_Trigger
        }
        removeUndefined(model.style)
        removeUndefined(model)
        // parse chat bot script
        if (model.chatBotReplies) {
          try {
            model.chatBotReplies = JSON.parse(model.chatBotReplies)
          } catch (e) {
            // log?
          }
        }
        // log
        console.log('old model', this.model)
        console.log('new model', model)
        // merge default properties with values from Context Service
        this.model = Object.assign({}, this.model, model)
        // log the new combined model
        console.log('new complete model', this.model)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      console.log('route changed to ', to)
      // if this route is new in view...
      // if (to === )
    },
    menuOpen (val, oldVal) {
      // close chat history when user clicks close on menu
      if (val === false && (this.showChatHistory === true || this.showChatBot === true)) {
        console.log('showing main menu instead')
        this.menuOpen = true
        this.showChatBot = false
        this.showChatHistory = false
        this.showMainMenu = true
      }
    },
    showChatHistory (val, oldVal) {
      if (val === true) {
        this.showChatBot = false
        this.showMainMenu = false
      }
    },
    showMainMenu (val, oldVal) {
      if (val === true) {
        this.showChatBot = false
        this.showChatHistory = false
      }
    },
    showChatBot (val, oldVal) {
      if (val === true) {
        this.showChatHistory = false
        this.showMainMenu = false
      }
    },
    shortCode (val, oldVal) {
      if (val.length) {
        this.showCobrowseModal = true
      }
    },
    model (val, oldVal) {
      this.changeStyle(val)
    },
    customer (val, oldVal) {
      this.updateModel(val)
    }
  }
}
</script>

<style>
.cmr-module-tab {
  font-family:HelveticaNeue-Light,HelvLightIBM,Arial,sans-serif;
  font-size:18px;
  line-height:26px;
  color:#fff;
  background-color: var(--color-1);
}

.cmr-panel .cmr-bottom-section .cmr-text-container h2::before,.cmr-panel .cmr-bottom-section .cmr-text-off-container h2::before,.cmr-panel .cmr-bottom-section>:not(#lpbutton):not(#lpbuttonLA):not(#lpbuttonLAV)>h2::before {
  color: var(--color-1);
  padding-left:23px;
  font-size:23px;
}

.cmr-module-tab:hover {
  background-color: var(--color-2);
}
.cmr-panel .cmr-bottom-section>:not(.advisor-block):not(.chat-bot):hover,.cmr-panel .cmr-bottom-section>:not(:empty)>.cmr-text-container:hover {
  border-left:4px solid var(--color-2);
  padding-left:0
}

.cmr-panel .cmr-bottom-section .cmr-text-container:hover h2::before,.cmr-panel .cmr-bottom-section>:not(#lpbutton):not(#lpbuttonLA):not(#lpbuttonLAV):hover h2::before {
  color: var(--color-2);
}

h2 small {
  font-size: 16px !important;
  color: var(--color-1) !important;
}

/*.cmr-panel .cmr-bottom-section .cmr-inactive:hover {
color:#323232
}*/

/*.cmr-panel .cmr-bottom-section .cmr-text-off-container h2::before,.cmr-panel .cmr-bottom-section .cmr-text-off-container:hover h2::before {
color:#A9A9A9
}
*/

html {
  background-color: var(--bg-color-expand) !important;
}

main {
  width: var(--bg-width);
  height: var(--bg-height);
  margin: var(--bg-margin);
  margin-top: var(--header-height);
  background-image: var(--bg-img);
  background-size: var(--bg-size);
  background-repeat: no-repeat;
  box-shadow: var(--body-box-shadow);
}

.main-expand {
  display: block;
  height: var(--bg-height);
  background-image: var(--bg-img-expand);
  background-color: var(--bg-color-expand);
  background-repeat: repeat-x;
}

.sticky-header {
  height: var(--header-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  /*color: #000;*/
  padding: 0px;
  background: var(--header-bg-color) !important;
  font-size: 1.25em;
}

.sticky-header span {
  height: var(--header-height);
  width: 100%;
  background-image: var(--header-img);
  background-repeat: no-repeat;
  background-position: center top;
}

.iframe-background {
  height: 100%;
  width: 100%;
  border: 0;
}

.my-links {
  position: absolute;
  background-color: transparent;
  border: var(--link-border);
}

#link1 {
  top: var(--link1-top);
  left: var(--link1-left);
  width: var(--link1-width);
  height: var(--link1-height);
}

#link2 {
  top: var(--link2-top);
  left: var(--link2-left);
  width: var(--link2-width);
  height: var(--link2-height);
}

</style>
