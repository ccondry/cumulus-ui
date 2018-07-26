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
              <li v-if="sessionInfo.demo && sessionInfo.version"><a href @click.prevent="currentTab = 'bot'" :class="currentTab === 'bot' ? 'active' : ''">ChatBot</a></li>
              <li><a href @click.prevent="currentTab = 'callback'" :class="currentTab === 'callback' ? 'active' : ''">Callback</a></li>
              <li><a href @click.prevent="currentTab = 'form'" :class="currentTab === 'form' ? 'active' : ''">Form</a></li>
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
                        <button class="btn btn-success" type="submit" @click.prevent="doSendEmail">{{ working ? 'Working...' : 'Send' }}</button>
                      </div>
                    </form>
                  </div>

                  <!-- Chat Tab -->
                  <div class="message-form" v-show="currentTab === 'chat'">
                    <!-- <div v-if="showChatIframe">
                      <iframe
                      class="chat-frame"
                      src="http://cceece.dcloud.cisco.com/system/web/view/live/customer/storeparams.html"></iframe>
                    </div> -->
                    <!-- <div v-else> -->
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
                            <textarea name="text" placeholder="Message" v-model="message"></textarea>
                          </div>
                        </div>
                        <div>
                          <button class="btn btn-success" type="submit" @click.prevent="doStartChat">Send</button>
                        </div>
                      </form>
                    <!-- </div> -->
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
                            <textarea name="text" placeholder="Message" v-model="message"></textarea>
                          </div>
                        </div>
                        <div>
                          <button class="btn btn-success" type="submit" @click.prevent="doStartCallback">Send</button>
                        </div>
                      </form>
                    <!-- </div> -->
                  </div>

                  <!-- Form Tab -->
                  <div class="message-form" v-show="currentTab === 'form'">
                    <form action="#" method="post" class="send-message" @submit.prevent="">
                      <vertical-formgroup
                      v-if="verticalConfig.form"
                      v-for="field in verticalConfig.form.fields"
                      :private="verticalConfig.form.private.includes(field)"
                      :name="field"
                      :placeholder="field"></vertical-formgroup>
                      <div>
                        <button class="btn btn-success" type="submit">Submit</button>
                      </div>
                    </form>
                  </div>

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

                </div>
                <div class="col-md-4">
                  <div class="info">
                    <p>Please select an option to get in contact with us.</p>
                    <ul>
                      <li><a :href="`tel:${contact.phone}`"><i class="fa fa-phone"></i>{{ contact.phone }}</a></li>
                      <li><a :href="`tel:${contact.jacada}`"><i class="fa fa-mobile"></i>{{ contact.jacada }}</a></li>
                      <!-- <li><a :href="`tel:${contact.mobile}`"><i class="fa fa-mobile"></i>{{ contact.mobile }}</a></li> -->
                      <li><i class="fa fa-globe"></i>{{ contact.address }}</li>
                      <li><i class="fa fa-envelope"></i><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></li>
                      <!-- <li><i class="fa fa-clipboard"></i><router-link to="/form">Fill Form</router-link></li> -->
                      <!-- <li><i class="fa fa-clipboard"></i><a href="assets/finance/form.html">Fill Form</a></li> -->
                    </ul>
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
          <vertical-map></vertical-map>
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
      working: false,
      name: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
      currentTab: 'email',
      showChatIframe: false,
      showCallbackIframe: false
    }
  },
  computed: {
    ...mapGetters([
      'apiBase',
      'contact',
      'verticalConfig',
      'sessionInfo'
    ]),
    firstName () {
      return this.name.split(' ')[0]
    },
    lastName () {
      return this.name.substring(this.name.split(' ')[0].length)
    }
  },
  methods: {
    ...mapActions([
      'failNotification',
      'successNotification',
      'sendEmail',
      'startChat',
      'startCallback',
      'startBot'
    ]),
    doSendEmail () {
      console.log('user clicked Send Email')
      console.log('sending email...')
      this.working = true
      this.sendEmail({
        name: this.name,
        subject: this.subject,
        text: this.message,
        email: this.email,
        html: this.message
      })
      .then(response => {
        this.working = false
        console.log('response', response)
        if (response.status >= 200 && response.status < 300) {
          // success!
          this.successNotification('Your message has been sent!')
        } else {
          // failed?!
          this.failNotification('Sorry, failed to send your message.<br />' + response)
        }
      })
      .catch(error => {
        // failed?!
        this.working = false
        console.log('error', error)
        this.failNotification('Sorry, failed to send your message.<br />' + error)
      })
    },
    doStartChat () {
      this.startChat({
        firstName: this.firstName,
        lastName: this.lastName,
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
        email: this.email,
        phone: this.phone
      })
    },
    doStartCallback () {
      this.startCallback({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        subject: this.message
      })
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
.chat-frame {
  height: 600px;
  width: 400px;
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
</style>
