<template>
  <div id="testimonails">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="heading-section">
            <h2>What Customers Say</h2>
            <under-heading></under-heading>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="testimonails-slider">
            <ul class="slides">
              <li v-for="testimonial in model.testimonials">
                <div class="testimonails-content">
                  <p>{{ testimonial.text }}</p>
                  <h6>{{ testimonial.author }} - <a href="#" @click.prevent="">{{ testimonial.authorRole }}</a></h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-testimonials',
  props: ['model']
}
</script>

<style>
.testimonails-content p {
  text-align: center;
  font-size: 15px;
  color: #333;
  font-style: italic;
}

.testimonails-content h6 {
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 30px;
  font-style: italic;
}
</style>
