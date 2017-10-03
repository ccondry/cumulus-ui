<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="heading-section">
          <h2>{{ verticalConfig.form.title }}</h2>
          <under-heading></under-heading>
        </div>
      </div>
    </div>
    <div id="contact-us">
      <div class="container">
        <div class="row">
          <div class="product-item col-md-12">
            <div class="row">
              <div class="col-md-8">

                <form class="form-horizontal" role="form" @submit.prevent="">
                  <vertical-formgroup v-for="field in verticalConfig.form.fields" :private="verticalConfig.form.private.includes(field)">{{ field }}</vertical-formgroup>
                  <div>
                    <button class="btn btn-success" type="submit">Submit</button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VerticalFormgroup from './vertical-formgroup'

export default {
  name: 'contact-us',
  components: {
    VerticalFormgroup
  },
  computed: {
    ...mapGetters([
      'verticalConfig'
    ])
  }
}
</script>

<style scoped>
input, textarea {
  padding: 10px;
  border: 1px solid #e2e2e2;
  width: 100%;
  margin-top: 25px;
  font-size: 13px;
  /*font-style: italic;*/
  /*font-weight: 300;*/
  color: #000;
  outline: none;
}

textarea {
  height: 165px;
  max-height: 180px;
  max-width: 770px;
  line-height: 18px;
  width: 100%
}
</style>
