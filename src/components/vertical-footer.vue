<template>
  <footer>
    <div class="container">
      <div class="top-footer">
        <div class="row">
          <div class="col-md-9">
            <div class="subscribe-form">
              <span>Get in touch with us</span>
              <!-- <form method="get" class="subscribeForm">
                <input type="text">
                <input type="submit">
              </form> -->
            </div>
          </div>
          <div class="col-md-3">
            <div class="social-bottom">
              <span>Follow us:</span>
              <ul>
                <li><a href="#" class="fa fa-facebook" @click.prevent=""></a></li>
                <li><a href="#" class="fa fa-twitter" @click.prevent=""></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="main-footer">
        <div class="row">
          <div class="col-md-3">
            <div class="about">
              <h4 class="footer-title">About Cumulus</h4>
              <p>
                Cumulus is a multinational company headquartered in California.
                We are involved in many businesses operating in different
                countries at the same time. We have offices and employees spread
                over the globe and we produce or sells goods of different nature.
              </p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="shop-list">
              <h4 class="footer-title">Customer Care Products</h4>
              <ul>
                <li><a target="_blank" href="http://www.cisco.com/c/en/us/products/customer-collaboration/packaged-contact-center-enterprise/index.html"><i class="fa fa-angle-right"></i>Cisco Contact Center Enterprise</a></li>
                <li><a target="_blank" href="http://www.cisco.com/c/en/us/products/customer-collaboration/unified-contact-center-express/index.html"><i class="fa fa-angle-right"></i>Cisco Contact Center Express</a></li>
                <li><a target="_blank" href="https://www.ciscospark.com/sparkcare.html"><i class="fa fa-angle-right"></i>Cisco Spark Care</a></li>
                <li><a target="_blank" href="http://www.cisco.com/c/en/us/products/customer-collaboration/finesse/index.html"><i class="fa fa-angle-right"></i>Cisco Finesse</a></li>
                <li><a target="_blank" href="http://www.cisco.com/c/en/us/products/customer-collaboration/unified-intelligence-center/index.html"><i class="fa fa-angle-right"></i>Cisco Unified Intelligence Center</a></li>
                <li><a target="_blank" href="http://www.cisco.com/c/en/us/products/customer-collaboration/remote-expert-mobile/index.html"><i class="fa fa-angle-right"></i>Cisco Remote Expert Mobile</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-3">
            <div class="recent-posts">
              <h4 class="footer-title">Recent Posts</h4>
              <div class="recent-post">
                <div class="recent-post-thumb">
                  <img :src="`/static/images/cumulus/common/recent-post1.jpg`" alt="Cisco Spark">
                </div>
                <div class="recent-post-info">
                  <h6><a href="https://www.ciscospark.com" target="_blank">Cisco Spark</a></h6>
                </div>
              </div>
              <div class="recent-post">
                <div class="recent-post-thumb">
                  <img :src="`/static/images/cumulus/common/recent-post2.jpg`" alt="Cisco Spark Care">
                </div>
                <div class="recent-post-info">
                  <h6><a href="https://www.ciscospark.com/sparkcare.html" target="_blank">Cisco Spark Care</a></h6>
                </div>
              </div>
              <div class="recent-post">
                <div class="recent-post-thumb">
                  <img :src="`/static/images/cumulus/common/recent-post3.jpg`" alt="The Omnichannel Experience">
                </div>
                <div class="recent-post-info">
                  <h6><a href="http://www.cisco.com/c/dam/en/us/products/customer-collaboration/unified-contact-center-enterprise/stronger-customer-relationships.pdf" target="_blank">The Omnichannel Experience</a></h6>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="more-info">
              <h4 class="footer-title">About Cisco</h4>
              <p>Cisco is the worldwide leader in IT that helps companies seize the opportunities of tomorrow by proving that amazing things can happen when you connect the previously unconnected. At Cisco customers come first and an integral part of our DNA is creating long-lasting customer partnerships and working with them to identify their needs and provide solutions that support their success.</p>
              <ul>
                <li><i class="fa fa-phone"></i>{{ contact.phone }}</li>
                <li><i class="fa fa-globe"></i>{{ contact.address }}</li>
                <li><i class="fa fa-envelope"></i><a :href="`mailto:${multichannelType}@cumulus.com`">{{ `${multichannelType}@cumulus.com` }}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>
          <a href="#" @click.prevent="">The Fine Print...</a>
        </p>
        <p>
          Cumulus obviously is not a real company. It was created to
          demonstrate CCBU's Customer Care User Experiences as they evolve and
          grow.
          <!-- All stories and pictures were borrowed from different web
          sites and owners have no idea their great products are being used
          to help us share our vision of awesome Customer Care. -->
        </p>
      </div>
      <div>
        <p>cumulus-ui v{{ version }} - Copyright © 2017 - <a href="#" @click.prevent="">Cisco Systems, Inc.</a></p>
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
