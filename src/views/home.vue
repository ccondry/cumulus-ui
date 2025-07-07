<template>
  <div>
    <vertical-slider :model="verticalConfig"></vertical-slider>
    <vertical-blog :model="verticalConfig"></vertical-blog>
    <vertical-services :model="verticalConfig"></vertical-services>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalSlider from '../components/vertical-slider.vue'
import VerticalBlog from '../components/vertical-blog.vue'
import VerticalServices from '../components/vertical-services.vue'

export default {
  name: 'Home',
  components: {
    VerticalSlider,
    VerticalBlog,
    VerticalServices,
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
