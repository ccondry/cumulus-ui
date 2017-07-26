<template>
  <div>
    <vertical-heading
    heading="Services"
    to="services"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-products :model="verticalConfig.services"
    heading="All Services"></vertical-products>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Services',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-products': require('src/components/vertical-products.vue')
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  }
}
</script>
