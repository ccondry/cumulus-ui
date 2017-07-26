<template>
  <div class="col-md-3 col-sm-6">
    <div class="team-thumb">
      <div class="author">
        <img :src="model.image" :alt="`${model.firstName} ${model.lastName}`">
      </div>
      <div class="overlay">
        <div class="author-caption">
          <ul>
            <li><a href="#" @click.prevent=""><i class="fa fa-facebook"></i></a></li>
            <li><a href="#" @click.prevent=""><i class="fa fa-twitter"></i></a></li>
            <li><a href="#" @click.prevent=""><i class="fa fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="author-details">
      <h2>{{ model.firstName }}</h2>
      <span>{{ model.role }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-author',
  props: ['model']
}
</script>

<style>
.team-thumb {
  position: relative;
  text-align: center;
}

.team-thumb .author img {
  width: 100%;
}

.team-thumb .overlay {
  background-color: rgba(0,0,0, 0.7);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
}

.team-thumb:hover .overlay {
 visibility: visible;
 opacity: 1;
 cursor: pointer;
}

.author-caption ul {
  padding: 0;
  margin: 0;
}

.author-caption li {
  list-style: none;
  display: inline-block;
  margin-top: 40%;
}

.author-caption a {
  display: inline-block;
  background-color: rgba(250,250,250, 0.4);
  width: 34px;
  height: 34px;
  line-height: 34px;
  color: #fff;
}

.author-caption a:hover {
  background-color: #7ac253;
  color: #fff;
}

.author-details {
  margin-top: 15px;
  text-align: center;
}

.author-details h2 {
  display: block;
  margin-bottom: 0px;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
}

.author-details span {
  color: #7ac253;
  text-transform: uppercase;
}
</style>
