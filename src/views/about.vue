<template>
  <div>
    <vertical-heading
    heading="About Us"
    to="about"
    :background="verticalConfig.headingImage"
    />
    <vertical-timeline-post :model="verticalConfig" />
    <vertical-our-team :model="verticalConfig"/>
    <vertical-testimonials :model="verticalConfig"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalHeading from '../components/vertical-heading.vue'
import VerticalTimelinePost from '../components/vertical-timeline-post.vue'
import VerticalOurTeam from '../components/vertical-our-team.vue'
import VerticalTestimonials from '../components/vertical-testimonials.vue'

export default {
  name: 'About',

  components: {
    VerticalHeading,
    VerticalTimelinePost,
    VerticalOurTeam,
    VerticalTestimonials,
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
