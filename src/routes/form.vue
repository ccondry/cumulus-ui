<template>
  <div>
    <vertical-heading
    heading="Form"
    to="form"
    :background="verticalConfig.headingImage"></vertical-heading>
    <vertical-form></vertical-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Form',
  components: {
    'vertical-heading': require('src/components/vertical-heading.vue'),
    'vertical-form': require('src/components/vertical-form.vue')
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  }
}
</script>
