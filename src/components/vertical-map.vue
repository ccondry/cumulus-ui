<template>
  <gmap-map
  :center="center"
  :zoom="7"
  style="width: 100%; height: 420px;">
  <gmap-marker
  :key="index"
  v-for="(m, index) in markers"
  :position="m.position"
  :clickable="true"
  :draggable="true"
  @click="center=m.position"></gmap-marker>
</gmap-map>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import config from 'src/config'

Vue.use(VueGoogleMaps, {
  load: {
    key: config.gmapsApiKey,
    v: 'OPTIONAL VERSION NUMBER'
    // libraries: 'places', //// If you need to use place input
  }
})

export default {
  name: 'vertical-map',
  data () {
    return {
      center: {lat: 37.4084425, lng: -121.9561531},
      markers: [{
        position: {lat: 37.4084425, lng: -121.9561531}
      }, {
        position: {lat: 11.0, lng: 11.0}
      }]
    }
  }
}
</script>
