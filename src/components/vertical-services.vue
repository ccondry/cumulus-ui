<template>
  <div id="services">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-section">
            <h2>Why Us?</h2>
            <under-heading></under-heading>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-6">
          <div class="service-item">
            <div class="icon">
              <i class="fa fa-star"></i>
            </div>
            <h4>The Best Service</h4>
            <p>
              We are always committed to provide the best service on any
              good. Delivering great services is our main goal. We do this on
              every business that our company is providing.
            </p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="service-item">
            <div class="icon">
              <i class="fa fa-clock-o"></i>
            </div>
            <h4>Ready to Serve</h4>
            <p>
              24/7, 365 days availability: You pickup your phone and we are a
              call away. Call us on our toll free number or chat with us on live
              chat support. We are available round the clock any time of the
              year. Email support is also available if that works best for you.
            </p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="service-item">
            <div class="icon">
              <i class="fa fa-user"></i>
            </div>
            <h4>Great Support</h4>
            <p>
              We keep listening to our customers for any suggestion or concern.
              We provide a state of the art Customer Care experience making you
              able to connect with us in many different ways.
            </p>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="service-item">
            <div class="icon">
              <i class="fa fa-heart"></i>
            </div>
            <h4>Satisfaction</h4>
            <p>
              Customer satisfaction is our top priority. We strive to make our
              customers happy and loyal. Just let us know if you have any
              concern and we'll do our best to make you satisfied.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-services'
}
</script>

<style>
.service-item {
  text-align: center;
}

.icon i {
  border-radius: 50%;
  border: 20px solid #7ac253;
  color: #7ac253;
  font-size: 28px;
  line-height: 80px;
  width: 120px;
  height: 120px;
}

.service-item h4 {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  margin-top: 25px;
}
</style>
