<template>
  <footer>
    <div class="container">
      <div>
        <p>cumulus-ui v{{ version }} - Copyright © 2019 - <a href="#" @click.prevent="">Cisco Systems, Inc.</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'vertical-footer',
  computed: {
    ...mapGetters([
      'vertical',
      'contact',
      'version',
      'multichannelType'
    ])
  }
}
</script>

<style>
footer {
  background-color: #f3f3f3;
  border-top: 4px solid #7ac253;
  margin-top: 120px;
}

.social-bottom {
  margin-top: 40px;
  padding-bottom: 40px;
}

.social-bottom span {
  font-family: 'Open Sans', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  float: left;
  margin-right: 26px;
}

.social-bottom ul {
  margin: 0;
  padding: 0;
}

.social-bottom li {
  list-style: none;
  display: inline-block;
}

.social-bottom a {
  background-color: #fff;
  font-size: 18px;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #bbb;
}

.social-bottom a:hover {
  background-color: #7ac253;
  color: #fff;
}

.subscribe-form {
  margin-top: 40px;
  padding-bottom: 40px;
}

.subscribe-form span {
  font-family: 'Open Sans', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
  float: left;
  margin-right: 26px;
}

.subscribeForm {
  position: relative;
  display: inline-block;
}

.subscribe-form input[type="submit"] {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  /*background: url(../images/subscribe-icon.png);*/
  background-repeat: no-repeat;
  background-position: center;
  color: transparent;
  background-color: transparent;
  content: '';
  margin-top: 0;
  border: 0;
}

.subscribe-form input#subscribe {
  padding: 4px 10px 4px 10px;
  line-height: 34px;
  height: 34px;
  max-width: 280px;
  width: 280px;
  margin-top: 0px;
  outline: 0;
  border-color: #f3f3f3;
}

.footer-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  padding-bottom: 20px;
}

.shop-list ul {
  margin: 0;
  padding: 0;
}

.shop-list li {
  list-style: none;
  margin: 10px 0;
}

.shop-list i {
  font-size: 16px;
  margin-right: 5px;
  color: #7ac253;
}

.shop-list a {
  text-transform: uppercase;
  color: #000;
  font-size: 13px;
}

.shop-list a:hover {
  color: #7ac253;
}

.recent-post {
  overflow: hidden;
  margin-bottom: 20px;
}

.recent-post-thumb {
  float: left;
  margin-right: 10px;
  width: 70px;
  height: 70px;
}

.recent-post-info {
  overflow: hidden;
}

.recent-post-info h6 {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0;
}

.recent-post-info a {
  color: #333;
}

.recent-post-info a:hover {
  color: #7ac253;
}

.recent-post-info span {
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: #7ac253;
}

.more-info p {
  padding-bottom: 20px;
}

.more-info ul {
  margin: 0;
  padding: 0;
}

.more-info li {
  list-style: none;
  margin: 10px 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  /*color: #666;*/
}

.more-info i {
  color: #7ac253;
  margin-right: 10px;
  font-size: 18px;
}

.bottom-footer {
  text-align: left;
  padding: 60px 0 15px 0;
}
</style>
