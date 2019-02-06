<template>
  <div id="product-post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-section">
            <h2>Feel free to send a message</h2>
            <under-heading></under-heading>
            <ul class="list-inline tab-list">
              <li><a href @click.prevent="currentTab = 'email'" :class="currentTab === 'email' ? 'active' : ''">Email</a></li>
              <li><a href @click.prevent="currentTab = 'chat'" :class="currentTab === 'chat' ? 'active' : ''">Chat</a></li>
              <li v-if="sessionDemo && !['upstream', 'sfdc'].includes(multichannelType)"><a href @click.prevent="currentTab = 'bot'" :class="currentTab === 'bot' ? 'active' : ''">ChatBot</a></li>
              <li><a href @click.prevent="currentTab = 'callback'" :class="currentTab === 'callback' ? 'active' : ''">Callback</a></li>
              <!-- Show Task Request option if demo is PCCE and task request has been enabled in demo session configuration -->
              <li v-if="sessionDemo === 'pcce' && sessionVersion === '11.6v3' && multichannelType !== 'upstream'">
                <a href
                @click.prevent="currentTab = 'request'"
                :class="currentTab === 'request' ? 'active' : ''">
                Request</a>
              </li>
              <!-- Hide the Form tab when using Upstream -->
              <li v-if="multichannelType !== 'upstream'"><a href @click.prevent="currentTab = 'form'" :class="currentTab === 'form' ? 'active' : ''">Form</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div id="contact-us">
        <div class="container">
          <div class="row">
            <div class="product-item col-md-12">
              <div class="row">
                <div class="col-md-8">

                  <!-- Email Tab -->
                  <div class="message-form" v-show="currentTab === 'email'">
                    <form action="#" method="post" class="send-message">
                      <div class="row">
                        <div class="name col-md-4">
                          <input type="text" name="name" placeholder="Name" v-model="name"/>
                        </div>
                        <div class="email col-md-4">
                          <input type="text" name="email" placeholder="Email" v-model="email"/>
                        </div>

                        <div class="subject col-md-4">
                          <input type="text" name="subject" placeholder="Subject" v-model="subject" />
                        </div>
                      </div>
                      <div class="row">
                        <div class="text col-md-12">
                          <textarea name="text" placeholder="Message" v-model="message"></textarea>
                        </div>
                      </div>
                      <div>
                        <button class="btn btn-success" type="submit" @click.prevent="doSendEmail" :disabled="working.email">
                          <span v-if="working.email" >
                            <i class="fa fa-spin fa-spinner"></i>
                            Working...
                          </span>
                          <span v-else>
                            Send
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>

                  <!-- Chat Tab -->
                  <div class="message-form" v-show="currentTab === 'chat'">
                    <div v-if="multichannelType === 'sfdc'">
                      <!-- <a id="liveagent_button_online_5731N000000XZYE" href="javascript://Chat" onclick="liveagent.startChat('5731N000000XZYE')">Chat Online</a> -->
                      <!-- <div id="liveagent_button_offline_5731N000000XZYE">Chat Offline</div> -->
                    </div>
                    <div v-else>
                      <form action="#" method="post" class="send-message">
                        <div class="row">
                          <div class="name col-md-4">
                            <input type="text" name="name" placeholder="Name" v-model="name"/>
                          </div>
                          <div class="email col-md-4">
                            <input type="text" name="email" placeholder="Email" v-model="email"/>
                          </div>
                          <div class="subject col-md-4" v-if="multichannelType !== 'upstream'">
                            <input type="text" name="subject" placeholder="Phone Number" v-model="phone" />
                          </div>
                        </div>
                        <div class="row">
                          <div class="text col-md-12">
                            <textarea v-if="sessionDemo !=='uccx'" name="text" placeholder="Message" v-model="message"></textarea>
                            <span v-else>&nbsp;</span>
                          </div>
                        </div>
                        <div>
                          <button class="btn btn-success" type="submit" @click.prevent="doStartChat">Send</button>
                        </div>
                      </form>
                    </div>
                </div>

                <!-- Callback Tab -->
                <div class="message-form" v-show="currentTab === 'callback'">
                  <!-- <div v-if="showCallbackIframe">
                  <iframe class="chat-frame" src="http://cceece.dcloud.cisco.com/system/templates/callback/kiwi/callback.html?subActivity=Callback&entryPointId=1001&templateName=kiwi&languageCode=en&countryCode=US&ver=v11"></iframe>
                </div>
                <div v-else> -->
                <form action="#" method="post" class="send-message">
                  <div class="row">
                    <div class="name col-md-4">
                      <input type="text" name="name" placeholder="Name" v-model="name"/>
                    </div>
                    <div class="email col-md-4">
                      <input type="text" name="email" placeholder="Email" v-model="email"/>
                    </div>
                    <div class="subject col-md-4">
                      <input type="text" name="subject" placeholder="Phone Number" v-model="phone" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="text col-md-12">
                      <textarea v-if="sessionDemo !=='uccx'" name="text" placeholder="Message" v-model="message"></textarea>
                      <span v-else>&nbsp;</span>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-success" type="submit" @click.prevent="doStartCallback" :disabled="working.callback">
                      <span v-if="working.callback" >
                        <i class="fa fa-spin fa-spinner"></i>
                        Working...
                      </span>
                      <span v-else>
                        Send
                      </span>
                    </button>
                  </div>
                </form>
                <!-- </div> -->
              </div>

              <!-- Form Tab -->
              <div class="message-form" v-show="currentTab === 'form'">
                <form action="#" method="post" class="send-message" @submit.prevent="">
                  <span v-if="verticalConfig.form">
                    <vertical-formgroup
                    v-for="field in verticalConfig.form.fields"
                    :private="verticalConfig.form.private.includes(field)"
                    :name="field"
                    :placeholder="field"></vertical-formgroup>
                  </span>
                  <div>
                    <button class="btn btn-success" type="submit" @click="currentTab = 'formSubmitted'">Submit</button>
                  </div>
                </form>
              </div>
              <!-- /Form Tab -->

              <!-- Form Submitted Tab -->
              <div class="message-form" v-show="currentTab === 'formSubmitted'">
                <h1>Form Submitted!</h1>
              </div>
              <!-- /Form Submitted Tab -->

              <!-- Bot Tab -->
              <div class="message-form" v-show="currentTab === 'bot'">
                <form action="#" method="post" class="send-message">
                  <div class="row">
                    <div class="name col-md-4">
                      <input type="text" name="name" placeholder="Name" v-model="name"/>
                    </div>
                    <div class="email col-md-4">
                      <input type="text" name="email" placeholder="Email" v-model="email"/>
                    </div>
                    <div class="subject col-md-4">
                      <input type="text" name="subject" placeholder="Phone Number" v-model="phone" />
                    </div>
                  </div>
                  <div class="row">
                    &nbsp;
                    <!-- <div class="text col-md-12">
                    <textarea name="text" placeholder="Message" v-model="message"></textarea>
                  </div> -->
                </div>
                <div>
                  <button class="btn btn-success" type="submit" @click.prevent="doStartBot">Send</button>
                </div>
              </form>
            </div>
            <!-- /Bot Tab -->

            <!-- Task Request Tab -->
            <div class="message-form" v-show="currentTab === 'request'">
              <form action="#" method="post" class="send-message" name="cobrowse-form">
                <div class="row">
                  <div class="name col-md-4">
                    <input type="text" name="name" placeholder="Name" v-model="name"/>
                  </div>
                  <div class="email col-md-4">
                    <input type="text" name="email" placeholder="Email" v-model="email"/>
                  </div>
                  <div class="subject col-md-4">
                    <input type="text" name="subject" placeholder="Phone Number" v-model="phone" />
                  </div>
                </div>
                <div class="row">
                  &nbsp;
                  <div class="form-group" style="margin-left: 15px; margin-right: 15px;">
                    <select class="form-control" v-model="requestType">
                      <option v-for="option of verticalConfig.taskOptions" :value="option">{{ option.text }}</option>
                    </select>
                  </div>
                  <!-- <textarea name="text" placeholder="Message" v-model="message"></textarea> -->
                <!-- </div> -->
              </div>
              <div>
                <button class="btn btn-success" type="submit" @click.prevent="clickTaskRequest">Send</button>
              </div>
            </form>
          </div>
          <!-- /Task Request Tab -->

        </div>
        <div class="col-md-4">
          <div class="info">
            <table class="contact-numbers">
              <tr v-if="mainPhoneEnabled"><td><a>Main</a></td><td><a>&gt;</a></td><td>{{ contact.phone }}</td></tr>
              <tr v-if="pqEnabled"><td><a>Gold</a></td><td><a>&gt;</a></td><td>{{ contact.pq }}</td></tr>
              <tr v-if="vivrEnabled"><td><a>VIVR</a></td><td><a>&gt;</a></td><td>{{ contact.jacada }}</td></tr>
              <tr v-if="upstreamEnabled"><td><a>UWF</a></td><td><a>&gt;</a></td><td>{{ contact.uwf }}</td></tr>
              <tr><td nowrap><a>Address</a></td><td><a>&gt;</a></td><td>{{ verticalConfig.address }}</td></tr>
              <tr><td><a>Email</a></td><td><a>&gt;</a></td><td>{{ `${multichannelType}@${verticalConfig.domain}` }}</td></tr>
            </table>

            <!-- <ul class="contact-numbers">
              <li v-if="multichannelType !== 'upstream'"><a :href="`tel:${contact.phone}`">Main &gt; {{ contact.phone }}</a></li>
              <li v-if="pqEnabled"><a :href="`tel:${contact.pq}`">Gold &gt; {{ contact.pq }}</a></li>
              <li v-if="multichannelType === 'ece'"><a :href="`tel:${contact.jacada}`">VIVR &gt; {{ contact.jacada }}</a></li>
              <li v-if="multichannelType === 'upstream'"><a :href="`tel:${contact.uwf}`">UWF &gt; {{ contact.uwf }}</a></li>
              <li>Address &gt; {{ verticalConfig.address }}</li>
              <li>Email &gt; <a :href="`mailto:${multichannelType}@${verticalConfig.domain}`">{{ `${multichannelType}@${verticalConfig.domain}` }}</a></li>
            </ul> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<div class="row">
  <div class="col-md-12">
    <div class="heading-section">
      <h2>Our Locations</h2>
      <under-heading></under-heading>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-12">
    <!-- <div id="googleMap" style="height:420px;"></div> -->
    <vertical-map :vertical="verticalConfig"></vertical-map>
  </div>
</div>
</div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import VerticalMap from './vertical-map'
import VerticalFormgroup from './vertical-formgroup'

export default {
  name: 'contact-us',
  components: {
    VerticalMap,
    VerticalFormgroup
  },
  data () {
    return {
      // working: false,
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
      currentTab: 'email',
      showChatIframe: false,
      showCallbackIframe: false,
      requestType: {text: ''}
    }
  },
  mounted () {
    this.chooseFirstRequestType()
    // init SFDC liveagent chat
    // window.liveagent.init('https://d.la1-c1-iad.salesforceliveagent.com/chat', '5721N000000Xbdn', '00D1N000001S9Vk')
    // if (!window._laq) {
    //   window._laq = []
    // }
    // init the SFDC liveagent watchers for the agent availability in SFDC
    // window._laq.push(function () {
    //   window.liveagent.showWhenOnline('5731N000000XZYE', document.getElementById('liveagent_button_online_5731N000000XZYE'))
    //   window.liveagent.showWhenOffline('5731N000000XZYE', document.getElementById('liveagent_button_offline_5731N000000XZYE'))
    // })
  },
  computed: {
    // ...mapState([
    // ]),
    ...mapGetters([
      'apiBase',
      'contact',
      'verticalConfig',
      'sessionConfig',
      'sessionDemo',
      'loading',
      'working',
      'sessionVersion',
      'multichannelType'
    ]),
    mainPhoneEnabled () {
      return this.multichannelType !== 'upstream'
    },
    pqEnabled () {
      return this.sessionDemo === 'pcce' && this.multichannelType !== 'upstream' && this.sessionVersion !== '11.6v2'
    },
    vivrEnabled () {
      return this.multichannelType === 'ece'
    },
    upstreamEnabled () {
      return this.multichannelType === 'upstream'
    },
    firstName () {
      return this.name.split(' ')[0]
    },
    lastName () {
      return this.name.substring(this.name.split(' ')[0].length)
    },
    messageEnabled () {
      return false
    }
  },
  methods: {
    ...mapActions([
      'failNotification',
      'successNotification',
      'sendEmail',
      'sendTaskRequest',
      'startChat',
      'startCallback',
      'startBot'
    ]),
    // resetChatIframe () {
    //   this.$refs.upstreamIframe.src = 'https://cceweb.dcloud.cisco.com:446/'
    // },
    chooseFirstRequestType () {
      // set the task request type option to the first option
      try {
        this.requestType = this.verticalConfig.taskOptions[0]
      } catch (e) {
        // do nothing
      }
    },
    clickTaskRequest () {
      console.log('clicked send task request')
      this.sendTaskRequest({
        name: this.name,
        email: this.email,
        phone: this.phone,
        title: this.requestType.text,
        description: this.requestType.text,
        cv1: this.name,
        cv2: this.requestType.text,
        cv3: this.phone,
        cv4: this.email
      })
    },
    doSendEmail () {
      console.log('user clicked Send Email')
      console.log('sending email...')
      // this.working = true
      this.sendEmail({
        name: this.name,
        subject: this.subject,
        text: this.message,
        email: this.email,
        html: this.message
      })
    },
    doStartChat () {
      this.startChat({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.name,
        email: this.email,
        phone: this.phone,
        subject: this.message
      })
    },
    doStartBot () {
      // TODO validate input
      this.startBot({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.name,
        email: this.email,
        username: this.$route.query.username,
        phone: this.phone
      })
    },
    doStartCallback () {
      this.startCallback({
        firstName: this.firstName,
        lastName: this.lastName,
        name: this.name,
        email: this.email,
        phone: this.phone,
        subject: this.message
      })
    }
  },
  watch: {
    verticalConfig () {
      console.log('verticalConfig changed - updating the request type selection to choose first available option')
      // vertical config changed - update UI where necessary
      this.chooseFirstRequestType()
    }
  }
}
</script>

<style scoped>
.active {
  text-decoration: underline;
}
.tab-list {
  font-size: 2em;
}
.tab-list li a:visited {
  text-decoration: inherit;
}
.chat-frame-div {
  /* height: 700px; */
  width: 60%;
  /* border: none; */
  margin-left: 40%;
}
.chat-frame {
  height: 700px;
  width: 100%;
  border: none;
  /* margin-left: 40%; */
}

.message-form input {
  margin-top: 0px;
}

.message-form textarea {
  padding-bottom: 20px;
}

.send {
  margin-top: 20px;
}

.info p {
  padding-bottom: 20px;
}

.info ul {
  margin: 0;
  padding: 0;
}

.info li {
  list-style: none;
  margin: 10px 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  /*color: #666;*/
}

.info i {
  color: #7ac253;
  margin-right: 10px;
  font-size: 18px;
}

input, textarea {
  padding: 10px;
  border: 1px solid #e2e2e2;
  width: 100%;
  margin-top: 25px;
  font-size: 13px;
  /*font-style: italic;*/
  /*font-weight: 300;*/
  color: #000;
  outline: none;
}

textarea {
  height: 165px;
  max-height: 180px;
  max-width: 770px;
  line-height: 18px;
  width: 100%
}

table.contact-numbers {
  font-size: 1em;
}

table.contact-numbers tr {
  /* border-bottom: 1px solid lightgrey; */
}

table.contact-numbers tr td {
  padding-left: 0.2em;
  padding-right: 0.2em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}

table.contact-numbers tr td:nth-child(3) {
  /* border-left: 1px solid lightgrey; */
}

ul.contact-numbers li a:link {
  color: black;
}
</style>
