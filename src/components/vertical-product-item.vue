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
            <a href @click.prevent="lightbox(model.image, model.description)">
              <img :src="`/static/images/cumulus/common/open-icon.png`">
            </a>
            <span>{{ model.name }}</span>
          </div>
        </div>
      </div>
      <div class="label-text">
        <h3><router-link to="single-product">{{ model.description }}</router-link></h3>
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
      'vertical'
    ])
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
