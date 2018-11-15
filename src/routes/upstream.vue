<template>
  <form ref="form" method="post" class="send-message" action="https://cceweb.dcloud.cisco.com:446/Home/Chat" target="">
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
    }
  },
  methods: {
    checkForm (val) {
      console.log('query string changed', val)
      // was there any query data set?
      if (val.name) {
        // update form values with query string values
        this.name = val.name ? val.name : this.name
        this.email = val.email ? val.email : this.email
        this.phone = val.phone ? val.phone : this.phone
        this.customerId = val.customerId ? val.customerId : this.customerId
        this.language = val.language ? val.language : this.language
        this.reason = val.reason ? val.reason : this.reason
        this.message = val.message ? val.message : this.message
        // submit form
        this.$refs.form.submit()
      }
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
