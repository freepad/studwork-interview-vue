<template>
  <div class="group">
    <input ref="input" :type="type" :value="value" @input="input" :class="{'-value': value}" />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>{{placeholder}}</label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: () => ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: () => ''
    }
  },
  mounted () {
    this.$refs.input.setAttribute('value', this.value)
  },
  methods: {
    input (event) {
      this.$refs.input.setAttribute('value', event.target.value)
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  // See: https://codepen.io/lewisvrobinson/pen/EyZwjR

  $bg-color: #424242;
  $hl-color: #2196F3;
  $muted-color: mix(white, $bg-color, 70%);
  $trans-time: 300ms;
  $width: 320px;

  .group {
    position: relative;
    margin: 45px 0;
  }

  // INPUTS // ============================== //
  textarea {
    resize: none;
  }

  input,
  textarea {
    box-sizing: border-box;
    background: none;
    color: $muted-color;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: $width;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $muted-color;
    &:focus {
      outline: none;
    }
    &:focus ~ label,
    &.-value ~ label {
      top: -14px;
      font-size: 12px;
      color: $hl-color;
    }
    &:focus ~ .bar:before {
      width: $width;
    }
  }

  input[type="password"] {
    letter-spacing: 0.3em;
  }

  label {
    color: $muted-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: $trans-time ease all;
  }

  .bar {
    position: relative;
    display: block;
    width: $width;
    &:before {
      content: '';
      height: 2px;
      width: 0;
      bottom: 0px;
      position: absolute;
      background: $hl-color;
      transition: $trans-time ease all;
      left: 0;
    }
  }
</style>
