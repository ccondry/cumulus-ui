<template>
  <div>
    <pre>{{ JSON.stringify(verticalConfig, null, 2) }}</pre>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VerticalHeading from '../components/vertical-heading.vue'

export default {
  name: 'Config',
  components: {
    VerticalHeading,
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
