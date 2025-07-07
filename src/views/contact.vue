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
import VerticalHeading from '../components/vertical-heading.vue'
import VerticalContactUs from '../components/vertical-contact-us.vue'

export default {
  name: 'Contact',
  components: {
    VerticalHeading,
    VerticalContactUs,
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
