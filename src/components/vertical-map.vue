<template>
  <!-- <gmap-map
  :center="center"
  :zoom="12"
  style="width: 100%; height: 420px;">
    <gmap-marker
    v-for="(m, index) in markers"
    @click="center=m.position"
    :position="m.position"
    :key="index"
    :clickable="true"
    :draggable="true"
    />
  </gmap-map> -->
</template>

<script>
// import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import config from '../config.js'

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: config.gmapsApiKey,
//     v: 'OPTIONAL VERSION NUMBER'
//     // libraries: 'places', //// If you need to use place input
//   }
// })

export default {
  name: 'vertical-map',
  props: ['vertical'],
  data () {
    return {
      center: {lat: 37.4084425, lng: -121.9561531},
      markers: [{
        position: {lat: 37.4084425, lng: -121.9561531}
      }, {
        position: {lat: 11.0, lng: 11.0}
      }]
    }
  },
  mounted () {
    this.updatePosition(this.vertical)
  },
  methods: {
    updatePosition (val) {
      if (val && val.gps && val.gps.latitude && val.gps.longitude) {
        // vertical changed
        // update map markers
        this.markers.pop()
        this.markers.push({
          position: {lat: Number(val.gps.latitude), lng: Number(val.gps.longitude)}
        })
        // update map center
        this.center.lat = Number(val.gps.latitude)
        this.center.lng = Number(val.gps.longitude)
      } else {
        console.log('gps latitude and longitude not set')
      }
    }
  },
  watch: {
    vertical (val) {
      this.updatePosition(val)
    }
  }
}
</script>
