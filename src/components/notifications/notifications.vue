<template>
  <div class="notifications">
    <notification
    v-for="(item, index) in notifications"
    :model="item"
    transition="fade"
    :key="index"
    >
    </notification>
  </div>
</template>

<style>
.notifications {
  position: fixed;
  right: 10px;
  top: 60px;
  width: 350px;
  z-index: 2001;
}
</style>

<script>
import { mapGetters } from 'vuex'
import NotificationItem from './notification.vue'

export default {
  name: 'NotificationItem',
  components: {
    NotificationItem
  },
  computed: {
    ...mapGetters([
      'notifications'
    ])
  }
  // methods: {
  //   ...mapActions({
  //     removeNotification: 'removeNotification'
  //   })
  // }
}
</script>
