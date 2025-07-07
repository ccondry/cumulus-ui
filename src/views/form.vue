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
import VerticalHeading from '../components/vertical-heading.vue'
import VerticalForm from '../components/vertical-form.vue'

export default {
  name: 'Form',
  components: {
    VerticalHeading,
    VerticalForm,
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  }
}
</script>
