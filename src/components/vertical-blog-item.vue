<template>
  <div class="col-md-4 col-sm-6">
    <div class="blog-post">
      <div class="blog-thumb">
        <img :src="model.image">
      </div>
      <div class="blog-content">
        <div class="content-show">
          <h4><a href="#" @click.prevent="">{{ model.title }}</a></h4>
          <span>{{ model.subTitle }}</span>
        </div>
        <div class="content-hide">
          <p>{{ model.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'vertical-blog-item',
  computed: {
    ...mapGetters([
      'vertical'
    ])
  },
  props: ['model']
}
</script>

<style>
.blog-post {
  position: relative;
  margin-bottom: 30px;
}

.blog-thumb {
  overflow: hidden;
  position: relative;
}

.blog-thumb img {
  width: 100%;
}

.blog-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0,0,0,0.7);
  color: #fff;
  padding: 15px;
}

.content-show a {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.content-show span {
  color: #7ac253;
}

.content-hide {
  margin-top: 15px;
  display: none;
}

.content-hide p {
  color: #fff;
}
</style>
