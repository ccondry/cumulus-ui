<!-- Displays content in a neat box with its own title. Use 1 panel per section of a page's content. -->
<template>
  <div class="form-group compact-form-group">
    <label class="control-label" :class="'col-sm-' + labelSize">Actions</label>
    <div :class="'col-sm-' + inputSize">
      <button type="submit" class="btn" :class="'btn-' + bsClass"
      :disabled="working || loading">
      <span v-if="loading || working">{{ buttonText }}</span>
      <slot v-if="!working && !loading">Submit</slot></button>
    </div>
  </div>
</template>

<style>
.compact-form-group {
  margin-bottom: 4px;
}
</style>

<script>
export default {
  name: 'formgroup-submit',
  replace: false,
  props: {
    loading: Boolean,
    working: Boolean,
    bsClass: {
      type: String,
      default: 'success'
    },
    labelSize: {
      default: '3'
    },
    inputSize: {
      default: '3'
    }
  },
  computed: {
    buttonText () {
      if (this.loading) {
        return 'Loading...'
      } else if (this.working) {
        return 'Working...'
      }
    }
  }
}
</script>
