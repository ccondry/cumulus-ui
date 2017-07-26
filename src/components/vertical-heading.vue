<template>
  <div id="heading" v-bind:style="{ 'background-image': 'url(' + background + ')' }">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-content">
            <h2>{{ heading }}</h2>
            <span>Home / <router-link :to="to">{{ heading }}</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-heading',
  props: {
    heading: '',
    to: '',
    background: ''
  }
}
</script>

<style>
#heading {
  /*background-image: url(../assets/images/bg-image.jpg);*/
  height: 140px;
}

#heading h2 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

#heading span {
  color: #fff;
  text-transform: uppercase;
}

.heading-content {
  text-align: center;
  margin-top: 35px;
}
</style>
