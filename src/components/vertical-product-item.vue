<template>
  <div class="col-md-3 col-sm-6 mix portfolio-item">
    <div class="portfolio-wrapper">
      <div class="portfolio-thumb">
        <!-- <a href @click.prevent="lightbox(`/static/images/cumulus/verticals/${vertical}/${model.image}`, model.description)">
          <img :src="`/static/images/cumulus/verticals/${vertical}/${model.thumbnail}`">
        </a> -->
        <img :src="model.thumbnail">
        <div class="hover">
          <div class="hover-iner">
            <a :href="wssUrl" target="_blank">
              <img :src="`/static/images/cumulus/common/open-icon.png`">
            </a>
            <span>{{ model.name }}</span>
          </div>
        </div>
      </div>
      <div class="label-text">
        <h3><a :href="wssUrl" target="_blank">{{ model.description }}</a></h3>
        <span class="text-category">{{ model.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'vertical-product-item',
  props: [
    'model'
  ],
  computed: {
    ...mapGetters([
      'vertical',
      'egainWssUrls'
    ]),
    wssUrl () {
      if (this.egainWssUrls && this.egainWssUrls[this.vertical]) {
        return this.egainWssUrls[this.vertical]
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions([
      'openLightbox'
    ]),
    lightbox (src, alt) {
      console.log('opening lightbox', src)
      this.openLightbox({src, alt})
    }
  }
}
</script>
