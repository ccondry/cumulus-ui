<template>
  <div class="form-group row">
    <label v-if="$slots['default']" class="col-sm-3 col-form-label" :style="private ? 'color: red;' : ''"><slot></slot></label>
    <div class="col-sm-6">
      <input class="form-control" :type="private ? 'password' : 'text'" :placeholder="placeholder" :name="name">
    </div>
  </div>
</template>

<script>
export default {
  name: 'vertical-formgroup',
  props: ['private', 'placeholder', 'name']
}
</script>
