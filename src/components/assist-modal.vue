<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="cancel">&times;</button>

        <div class="modal-header">
          <h3>Share my screen with the support agent</h3>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form" @submit.prevent="">
            <div class="form-group row">
              <button type="button" class="btn btn-info form-control" @click.prevent="clickCobrowse">Already on the call, want to share</button>
            </div>
            <div class="form-group row">
              <button type="button" class="btn btn-info form-control" @click.prevent="clickAssist">Call support and then share</button>
            </div>
            <div class="form-group row">
              <button type="button" class="btn btn-default form-control" @click.prevent="cancel">I don't need help</button>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'assist-modal',
  created () {
    // watch scroll, to detect when to pop the menu out
    window.addEventListener('keyup', this.handleKeyUp)
  },
  destroyed () {
    // stop watching to avoid errors
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    ...mapActions([
      'startRemCall'
    ]),
    handleKeyUp (e) {
      switch (e.keyCode) {
        // esc
        case 27: {
          this.cancel()
          break
        }
      }
    },
    clickAssist () {
      console.log('click Assist')
      this.startRemCall()
      this.$emit('close')
    },
    clickCobrowse () {
      console.log('click Cobrowse')
      this.$emit('cobrowse')
    },
    cancel () {
      console.log('cancel')
      this.$emit('close')
    }
  }
}
</script>

<style>
/*  Modals  */

.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
@media screen and (max-width: 568px) {
  .modal-container {
    max-width: 380px;
  }
}
@media screen and (max-width: 720px) and (min-width: 569px){
  .modal-container {
    max-width: 640px;
  }
}
@media screen and (max-width: 1400px) and (min-width: 721px) {
  .modal-container {
    max-width: 1024px;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: var(--color-1);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
* the following styles are auto-applied to elements with
* v-transition="modal" when their visiblity is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
