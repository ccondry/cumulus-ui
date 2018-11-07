<template>
  <div id="timeline-post">
    <div id="timeline-post">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="heading-section">
              <h2>Who We Are</h2>
              <under-heading></under-heading>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <h3>About Us</h3>
            <p>
              We are a multinational company headquartered in California.
              We are involved in many businesses operating in different
              countries at the same time. We have offices and employees spread
              over the globe, and we produce a variety of goods and services.
            </p>
          </div>
          <div class="col-md-6">
            <h3>Our Business</h3>
            <p>
              We are a corporation with many business. We have financial
              institutions, healthcare organizations, travel agencies, gas and
              electricity distributions, and city services for municipalities.
            </p>
          </div>
        </div>

        <div class="space50"></div>

        <div class="row">
          <vertical-timeline-post-item
          v-for="item in model.timelinePosts"
          :model="item">
          </vertical-timeline-post-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalTimelinePostItem from './vertical-timeline-post-item'

export default {
  name: 'timeline-post',
  components: {
    VerticalTimelinePostItem
  },
  props: ['model']
}
</script>
