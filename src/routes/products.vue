<template>
  <div>
    <vertical-heading
    heading="Products"
    to="products"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-products :model="verticalConfig.products"
    heading="All Products"></vertical-products>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Products',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-products': require('src/components/vertical-products.vue')
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
