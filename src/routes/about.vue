<template>
  <div>
    <vertical-heading
    heading="About Us"
    to="about"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-timeline-post :model="verticalConfig"></vertical-timeline-post>
    <vertical-our-team :model="verticalConfig"></vertical-our-team>
    <vertical-testimonials :model="verticalConfig"></vertical-testimonials>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'About',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-timeline-post': require('src/components/vertical-timeline-post.vue'),
    'vertical-our-team': require('src/components/vertical-our-team.vue'),
    'vertical-testimonials': require('src/components/vertical-testimonials.vue')
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
