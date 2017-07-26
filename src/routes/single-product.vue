<template>
  <div>
    <vertical-heading
    heading="Single Product"
    to="single-product"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-single-product></vertical-single-product>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Contact',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-single-product': require('src/components/vertical-single-product.vue')
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  }
}
</script>
