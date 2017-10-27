<template>
  <div>
    <vertical-heading
    heading="Contact Us"
    to="contact"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-contact-us></vertical-contact-us>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Contact',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-contact-us': require('src/components/vertical-contact-us.vue')
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  },
  methods: {
    ...mapActions([
      'checkSession'
    ])
  },
  mounted () {
    console.log('query =', this.$route.query)
    // see if session, datacenter, vertical are in queryString or localStorage
    this.checkSession(this.$route.query)
  }
}
</script>
