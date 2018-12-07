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
  }
}
</script>
