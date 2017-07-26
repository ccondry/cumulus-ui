<template>
  <div class="col-md-2 col-sm-4">
    <div class="timeline-thumb">
      <div class="thumb">
        <img :src="model.image" alt="">
      </div>
      <div class="overlay">
        <div class="timeline-caption">
          <router-link :to="{ params: { vertical: model.link }}"><h4>{{ model.title }}</h4></router-link>
          <p>{{ model.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalTimelinePostItem from './vertical-timeline-post-item'

export default {
  name: 'timeline-post-item',
  components: {
    VerticalTimelinePostItem
  },
  props: ['model']
}
</script>

<style>
.timeline-thumb {
  position: relative;
  text-align: center;
  border-bottom: 3px solid #dbdbdb;
}

.timeline-thumb:hover {
  border-color: #7ac253;
}

.timeline-thumb .thumb img {
  width: 100%;
  overflow: hidden;
}
.timeline-thumb .overlay {
  background-color: rgba(0,0,0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
}

.timeline-thumb:hover .overlay {
 visibility: visible;
 overflow: hidden;
 opacity: 1;
 cursor: pointer;
}

.timeline-caption h4 {
  padding-top: 80px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  margin: 0 0 3px 0;
}

.timeline-caption p {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #7ac253;
}
</style>
