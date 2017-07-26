<template>
  <div id="latest-blog">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-section">
            <h2>{{ h2 }}</h2>
            <under-heading></under-heading>
          </div>
        </div>
      </div>
      <div class="row">
        <vertical-blog-item
        v-for="item in model.blogItems"
        :model="item"
        ></vertical-blog-item>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalBlogItem from './vertical-blog-item'

export default {
  name: 'vertical-blog',
  components: {
    VerticalBlogItem
  },
  props: ['model'],
  computed: {
    h2 () {
      return 'Top ' + (this.model.products && this.model.products.length ? 'Products' : 'Services')
    }
  }
}
</script>
