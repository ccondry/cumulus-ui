<template>
  <div>
    <slider animation="fade" :speed="1000" :interval="30000" height="600px">
      <slider-item v-for="slider in model.sliders">
        <div class="slider-caption">
          <h1>{{ slider.title }}</h1>
          <p>
            {{ slider.text1 || ' ' }}
          </p>
          <p>
            {{ slider.text2 || ' ' }}
          </p>
          <router-link v-if="slider.buttonText" :to="slider.buttonLink">{{ slider.buttonText }}</router-link>
        </div>
        <img :src="slider.image">
      </slider-item>
    </slider>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  name: 'vertical-slider',
  components: {
    Slider,
    SliderItem
  },
  props: ['model']
}
</script>

<style>
.slider-caption {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  color: #fff;
  font-family: 'Open Sans', sans-serif;
  background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) );
}

.slider-caption h1 {
  margin-top: 160px;
  text-shadow: 1px 1px #777;
  font-size: 48px;
  padding-bottom: 10px;
  font-weight: 500;
  color: #7ac253;
  text-transform: uppercase;
}

.slider-caption p {
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  line-height: 15px;
}

.slider-caption a {
  margin-top: 20px;
  text-decoration: none;
  display: inline-block;
  background-color: #7ac253;
  width: 200px;
  height: 40px;
  text-align: center;
  color: #fff;
  line-height: 40px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
}

/*-- End Slider --*/

.slider, .slider-item, .slider img{
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  /*height: 600px;*/
}
/*.slider img {
width: 100%;
overflow: hidden;
margin: 0;
padding: 0;
height: 600px;
}*/
</style>
