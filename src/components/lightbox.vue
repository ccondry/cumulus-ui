<template>
  <span>
    <div class="my-lightbox" v-show="lightbox.open" @click="clickClose()" >
      <button @click="clickClose()" class="close" aria-label="Close alert" type="button">
        <span aria-hidden="true">&times;</span>
      </button>
      <img :src="lightbox.src" :alt="lightbox.alt">
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'lightbox',
  methods: {
    ...mapActions([
      'closeLightbox'
    ]),
    clickClose () {
      this.closeLightbox()
    }
  },
  computed: {
    ...mapGetters([
      'lightbox'
    ])
  }
}
</script>

<style>
.my-lightbox {
  z-index:9999;
  position: fixed;
  top: 10%;
  left: 20%;
  width: 100%;
  height: 100%;
  /*margin-left: -40%;*/
  /*margin-top: -40%;*/
}
.my-lightbox img {
  max-width: 100%;
  max-height: 100%;
  box-shadow: 100px 100px 100px rgba(0,0,0,.6);
}
</style>
