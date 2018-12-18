<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">

        <button type="button" class="close" @click="cancel">&times;</button>

        <div class="modal-header">
          <h3>Set dCloud Session</h3>
        </div>
        <div class="modal-body">
          <form class="form-horizontal" role="form" @submit.prevent="submit">
            <div class="form-group">
              Set the session ID and datacenter to match your dCloud session.
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Session ID:</label>
              <div class="col-sm-6">
                <input class="form-control" v-model="sessionId">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Datacenter:</label>
              <div class="col-sm-6">
                <select v-model="datacenter">
                  <option disabled value="">Please Choose Datacenter</option>
                  <option v-for="dc in datacenters" :value="dc.value">{{ dc.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-4 col-form-label">Vertical:</label>
              <div class="col-sm-6">
                <select v-model="vertical" v-if="verticals && verticals.length">
                  <option disabled value="">Please Choose Vertical</option>
                  <option v-for="vertical in systemVerticals" :value="vertical.id">{{ vertical.name }}</option>
                  <option v-if="showAllVerticals" disabled>----------------------------</option>
                  <option v-for="vertical in userVerticals" :value="vertical.id" v-if="showAllVerticals">{{ vertical.name }}</option>
                </select>
                <!-- <strong>
                  Show All
                </strong>
                <input type="checkbox" v-model="showAllVerticals" /> -->
              </div>
            </div>
            <div class="form-group row" v-show="false">
              <label class="col-sm-4 col-form-label">On VPN:</label>
              <div class="col-sm-6">
                <select v-model="isLocal">
                  <option disabled value="">Please Choose</option>
                  <option :value="true" selected>Yes</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </div>
            <div class="form-group pull-right">
              <button type="submit" class="btn btn-success" :disabled="submitDisabled">Set</button>
              <button type="button" class="btn btn-default" @click.prevent="cancel">Cancel</button>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

const datacenters = [{
  name: 'APJ',
  value: 'SNG'
}, {
  name: 'EMEAR',
  value: 'LON'
}, {
  name: 'GC',
  value: 'GC'
}, {
  name: 'US East',
  value: 'RTP'
}, {
  name: 'US West',
  value: 'SJC'
}]

export default {
  name: 'session-modal',
  created () {
    // watch scroll, to detect when to pop the menu out
    window.addEventListener('keyup', this.handleKeyUp)
  },
  destroyed () {
    // stop watching to avoid errors
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  mounted () {
    this.sessionId = this._sessionId
    this.datacenter = this._datacenter
    this.showAllVerticals = this._showAllVerticals
    console.log('session-modal.vue - mounted - setting this.showAllVerticals to', this.showAllVerticals)
    this.vertical = this._vertical
    console.log('session-modal.vue - mounted - setting this.vertical to', this._vertical)
    this.isLocal = this._isLocal
  },
  data () {
    return {
      sessionId: '',
      datacenter: '',
      datacenters,
      vertical: 'travel',
      isLocal: true,
      showAllVerticals: false
    }
  },
  methods: {
    ...mapActions({
      setSession: 'setSession',
      setNeedsSession: 'setNeedsSession'
    }),
    handleKeyUp (e) {
      switch (e.keyCode) {
        // esc
        case 27: {
          this.cancel()
          break
        }
      }
    },
    submit () {
      console.log('submit')
      const sessionId = this.sessionId.trim()
      const datacenter = this.datacenter
      const vertical = this.vertical
      const isLocal = this.isLocal
      const showAllVerticals = this.showAllVerticals
      // change the session and datacenter in state
      this.setSession({
        sessionId,
        datacenter,
        vertical,
        isLocal,
        showAllVerticals
      })
      this.setNeedsSession(false)
    },
    cancel () {
      console.log('cancel')
      // dismiss the session/datacenter prompt
      this.setNeedsSession(false)
    }
  },
  computed: {
    ...mapGetters({
      _sessionId: 'sessionId',
      _datacenter: 'datacenter',
      needsSession: 'needsSession',
      _vertical: 'vertical',
      _isLocal: 'isLocal',
      _showAllVerticals: 'showAllVerticals',
      verticals: 'verticals'
    }),
    sortedVerticals () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted verticals`, e)
      }
    },
    systemVerticals () {
      return this.sortedVerticals.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userVerticals () {
      return this.sortedVerticals.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    submitDisabled () {
      // disable the submit button if either input is empty/not set
      return this.sessionId === '' || this.datacenter === ''
    }
  },
  watch: {
    vertical (val) {
      // if vertical is undefined, select the first option
      if (val === undefined) {
        this.vertical = this.verticals[0]
      }
    },
    _vertical (val, oldVal) {
      console.log('session-modal.vue - this._vertical changed to', val)
      this.vertical = val
      if (val === undefined) {
        this.vertical = this.verticals[0]
      }
    },
    _sessionId (val, oldVal) {
      this.sessionId = val
    },
    _datacenter (val, oldVal) {
      this.datacenter = val
    },
    _isLocal (val, oldVal) {
      this.isLocal = val
    },
    _showAllVerticals (val, oldVal) {
      console.log('session-modal.vue - this._showAllVerticals changed to', val)
      this.showAllVerticals = val
      // update the select
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
