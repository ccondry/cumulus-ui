<template>
  <!-- REM cobrowse short code display -->
  <confirmation-modal>
    <h3 slot="header">Cobrowse Code</h3>

  </confirmation-modal>
</template>
<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="cancel">&times;</button>

        <div class="modal-header">
          <h3>Cobrowse Code</h3>
        </div>

        <div class="modal-body">
          <!-- <p>Here is your Cobrowse Code</p> -->
          <div class="short-code">
            Your cobrowse code is <strong>{{ shortCode }}</strong>. Please give this code to the agent.
          </div>

          <div class="pull-right">
            <button type="button" class="btn btn-default" @click="ok">OK</button>
          </div>
        </div>

        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cobrowse-modal',
  props: ['shortCode'],
  methods: {
    cancel () {
      console.log('clicked cancel')
      // dismiss the modal
      this.$emit('close')
    },
    ok () {
      console.log('clicked ok')
      // dismiss the modal
      this.$emit('close')
    }
  }
}
</script>
