<template>
  <div class="notifications">
    <notification v-for="item in notifications"
    :model="item"
    transition="fade">
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
import notification from 'src/components/notifications/notification.vue'

export default {
  name: 'notifications',
  components: {
    notification
  },
  computed: {
    ...mapGetters({
      notifications: 'notifications'
    })
  }
  // methods: {
  //   ...mapActions({
  //     removeNotification: 'removeNotification'
  //   })
  // }
}
</script>
