<!--
this route is built to accept URL query parameters to fill out and POST the
form to start a chat on UpstreamWorks
-->
<template>
  <!-- <form ref="form" method="post" class="send-message" action="https://cceweb.dcloud.cisco.com:446/Home/Chat" target=""> -->
  <form ref="form" method="post" class="send-message" :action="`https://${datacenter}-${session}.tunnel.cc-dcloud.com/Home/Chat`" target="">
    <input type="hidden" name="ContactName" placeholder="Name" v-model="name"/>
    <input type="hidden" name="Email" placeholder="Email" v-model="email"/>
    <input type="hidden" name="Phone" placeholder="Phone Number" v-model="phone" />
    <input type="hidden" name="CustomerId" v-model="customerId" />
    <input type="hidden" name="UserLanguage" v-model="language" />
    <input type="hidden" name="Reason" v-model="reason" />
    <input type="hidden" name="Parameters[CustomKey]" value="CustomValue" />
    <input type="hidden" name="Parameters[TimeZoneOffset]" value="Central Standard Time" />
    <input type="hidden" name="Message" placeholder="Message" v-model="message" />
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      customerId: '1',
      language: 'en',
      reason: 'Billing',
      message: ''
    }
  },
  mounted () {
    this.checkForm(this.$route.query)
  },
  computed: {
    query () {
      return this.$route.query
    },
    datacenter () {
      return this.query.datacenter
    },
    session () {
      return this.query.session
    }
  },
  methods: {
    checkForm (val) {
      console.log('query string changed', val)
      // update form values with query string values
      if (val.name) {
        this.name = val.name
      } else if (val.fieldname_1) {
        this.name = val.fieldname_1
      }
      if (val.email) {
        this.email = val.email
      } else if (val.fieldname_2) {
        this.email = val.fieldname_2
      }
      if (val.phone) {
        this.phone = val.phone
        this.customerId = val.phone
      } else if (val.fieldname_3) {
        this.phone = val.fieldname_3
        this.customerId = val.fieldname_3
      }
      if (val.message) {
        this.message = val.message
      } else if (val.fieldname_4) {
        this.message = val.fieldname_4
      }
      if (val.customerId) {
        this.customerId = val.customerId
      }
      if (val.language) {
        this.language = val.language
      }
      if (val.reason) {
        this.reason = val.reason
      }
      // submit form
      this.$refs.form.submit()
    }
  },
  watch: {
    query (val) {
      this.checkForm(val)
    }
  }
}
</script>

<style scoped>
.active {
  text-decoration: underline;
}

.send {
  margin-top: 20px;
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
