<template>
  <div>
    <vertical-heading
    heading="Products"
    to="products"
    :background="verticalConfig.headingImage"
    />
    <vertical-products
    :model="verticalConfig.products"
    heading="All Products"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalHeading from '../components/vertical-heading.vue'
import VerticalProducts from '../components/vertical-products.vue'

export default {
  name: 'Products',
  components: {
    VerticalHeading,
    VerticalProducts,
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
