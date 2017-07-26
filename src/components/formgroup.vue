<template>
  <span>
    <div class="form-group compact-form-group">
      <label class="control-label" :class="'col-sm-' + labelSize"><slot><i>No Label</i></slot></label>
      <div :class="'col-sm-' + inputSize">
        <span v-if="pre">
          <pre>{{ value }}</pre>
        </span>
        <span v-else>
          <input type="text" class="form-control"
          ref="input"
          :value="value" @input="updateValue($event.target.value)"
          :disabled="disabled" :name="name"
          :placeholder="placeholder" :required="required"
          @change="changeAction"/>
        </span>
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'formgroup',
  props: {
    value: {
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      required: false
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {},
    pre: {
      type: Boolean
    },
    labelSize: {
      default: '3'
    },
    inputSize: {
      default: '3'
    },
    changeAction: {
      type: Function,
      default: e => {}
    }
  },
  methods: {
    updateValue (value) {
      var formattedValue = value
      // Remove whitespace on either side
      // .trim()
      // Shorten to 2 decimal places
      // .slice(0, value.indexOf('.') + 3)

      // If the value was not already normalized,
      // manually override it to conform
      // if (formattedValue !== value) {
      //   this.$refs.input.value = formattedValue
      // }
      // Emit the number value through the input event
      this.$emit('input', formattedValue)
    }
  }
}
</script>
