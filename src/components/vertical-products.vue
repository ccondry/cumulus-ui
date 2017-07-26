<template>
  <div id="products-post">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="product-heading">
            <h2>{{ heading }}</h2>
            <under-heading></under-heading>
          </div>
        </div>
      </div>
      <div class="row">
  </div>
  <div class="row" id="Container">
    <vertical-product-item v-for="product in model" :model="product"></vertical-product-item>
  </div>
  <div class="pagination">
    <div class="row">
      <div class="col-md-12">
        <ul>
          <li><a href="#" @click.prevent="">1</a></li>
          <li><a href="#" @click.prevent="">2</a></li>
          <li><a href="#" @click.prevent="">3</a></li>
          <li><a href="#" @click.prevent="">&gt;&gt;</a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import VerticalProductItem from './vertical-product-item'

export default {
  name: 'vertical-products',
  components: {
    VerticalProductItem
  },
  props: ['model', 'heading']
}
</script>

<style>
#product-heading {
  text-align: center;
  padding: 100px 0 30px 0;
}

#product-heading h2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  color: #333;
  font-weight: 700;
  text-transform: uppercase;
}

#Container {
  margin-top: 80px;
}

/*#Container .mix {
  display: none;
}*/

.portfolio-wrapper {
  overflow: hidden;
  padding-top: 20px;
}


#filters {
  text-align: center;
}

#filters ul {
  margin: 0px;
  padding: 0px;
}

#filters li {
  cursor: pointer;
  list-style: none;
  display: inline-block;
}

#filters span {
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #444;
  padding-left: 15px;
}


#filters span:hover {
  color: #7ac253;
  transition: all 0.3s ease-in;
}

.label-text a {
  color: #333;
}

.label-text a:hover {
  color: #7ac253;
}

.label-text h3 {
  margin: 10px 0 2px 0;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
}

.label-text span {
  color: #777;
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  display: block;
  color: #7ac253
}

.portfolio-thumb img {
  width: 100%;
}

.portfolio-thumb {
  position: relative;
}

.hover-iner {
  position: relative;
  width: 100%;
  height: 100%;
}

.hover-iner a {
  position: absolute;
  top: 35%;
  left: 43%;
  margin-left: -18px;
  margin-top: -18px;
  background-color: rgba(0,0,0, 0.1);
  border: 1px solid #7ac253;
  width: 80px;
  height: 80px;
  line-height: 80px;
  color: #fff;
  text-align: center;
}

.hover-iner img {
  width: auto;
}

.hover-iner span {
  position: absolute;
  text-transform: uppercase;
  color: #fff;
  margin-top: 190px;
  text-align: center;
  font-size: 13px;
  width: 100%;
  color: #7ac253;
  font-weight: 300;
}

.hover {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  visibility: hidden;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

.portfolio-wrapper:hover .portfolio-thumb .hover {
  visibility: visible;
  opacity: 1;
  transition: all 0.3s ease-in;
}

.pagination {
  margin-top: 60px;
}

.pagination ul {
  padding: 0;
  margin: 0;
}
.pagination li {
  list-style: none;
  display: inline-block;
}

.pagination a {
  background-color: #444;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  display: block;
  text-align: center;
}

.pagination a:hover {
  background-color: #7ac253;
}

</style>
