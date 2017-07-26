<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="close">&times;</button>

        <div class="modal-header">
          <slot name="header">
            <h3>Confirm</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="message">
            <p>Confirm?</p>
          </slot>
            <form class="form-horizontal" role="form" @submit.prevent="action">
              <div class="form-group">
                <slot name="form">
                </slot>
                <div class="pull-right">
                  <slot name="form-actions">
                    <button type="submit" class="btn btn-success">Yes</button>
                    <button type="button" class="btn btn-danger" @click="close">No</button>
                    <button type="button" class="btn btn-default" @click="close">Cancel</button>
                  </slot>
                </div>
              </div>
            </form>
        </div>

        <div class="modal-footer">
          <slot name="footer">

          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmation-modal',
  replace: false,
  props: {
    action: {
      type: Function
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
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
  color: #42b983;
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
