<template>
  <div>
    <vertical-heading
    heading="Services"
    to="services"
    :background="verticalConfig.headingImage"
    />
    <vertical-products
    :model="verticalConfig.services"
    heading="All Services"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalHeading from '../components/vertical-heading.vue'
import VerticalProducts from '../components/vertical-products.vue'

export default {
  name: 'Services',
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
