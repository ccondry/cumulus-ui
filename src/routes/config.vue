<template>
  <div>
    <pre>{{ JSON.stringify(verticalConfig, null, 2) }}</pre>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  }
}
</script>
