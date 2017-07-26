<template>
  <div id="our-team">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-section">
            <h2>Our Team</h2>
            <under-heading></under-heading>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="authors">
          <vertical-author v-for="author in model.authors" :model="author"></vertical-author>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalAuthor from './vertical-author'

export default {
  name: 'our-team',
  components: {
    VerticalAuthor
  },
  props: ['model']
}
</script>
