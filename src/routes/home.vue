<template>
  <div>
    <vertical-slider :model="verticalConfig"></vertical-slider>
    <vertical-blog :model="verticalConfig"></vertical-blog>
    <vertical-services :model="verticalConfig"></vertical-services>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    'vertical-slider': require('src/components/vertical-slider.vue'),
    'vertical-blog': require('src/components/vertical-blog.vue'),
    'vertical-services': require('src/components/vertical-services.vue')
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
