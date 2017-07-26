<template>
  <span>
    <footer class="footer">
      <div class="pull-right">
        <b>Version</b> {{ version }}
      </div>
    </footer>
  </span>
</template>

<script>
export default {
  name: 'app-footer',
  created () {
    console.log('this.$store.getters', this.$store.getters)
  },
  computed: {
    version () {
      return this.$store.getters.version
    }
  }
}
</script>

<style scoped>
.footer {
  /*position: absolute;*/
  bottom: 0px;
  width: 100%;
  color: #7f8c8d;
  font-size: 0.9em;
  padding-right: 1em;
  /*margin-top: 2em;
  padding-top: 2em;
  border-top: 1px solid #e5e5e5;

  margin-right: 1em;*/
}
.footer div {

}
</style>
