<template>
  <div class="vuestic-tree-node"
       :class="{'vuestic-tree-node-selected': selected}"
  >
    <div class="vuestic-tree-node-checkbox" v-if="$slots.checkbox">
      <slot name="checkbox"/>
    </div>
    <div class="vuestic-tree-node-icon" v-if="$slots.icon">
      <slot name="icon"/>
    </div>
    <div class="vuestic-tree-node-label">
      <slot/>
    </div>
    <div class="vuestic-tree-node-icon-right" v-if="$slots.iconRight">
      <slot name="iconRight"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vuestic-tree-node',
    props: {
      selected: {
        type: Boolean,
        default: false,
      },

    },
  }
</script>

<style lang="scss">

  // Colors //
  $gray-light: #acb5be !default;
  $light-gray: #eee;
  $lighter-gray: #ddd;
  $charcoal: #555;
  $darkest-gray: #333;
  $almost-black: #161616;
  $vue-light-green: #dbf9e8;
  $vue-green: #4ae387;
  $light-green: #c8f9c5;
  $light-blue: #dcf1ff;
  $light-yellow: #fff1c8;
  $light-pink: #ffcece;
  $vue-darkest-blue: #34495e;
  $vue-turquoise: #dbf9e7;
  $white: #fff;
  $theme-red: #e34a4a;
  $theme-orange: #f7cc36;
  $theme-blue: #4ab2e3;
  $theme-violet: #db76df;
  $theme-pale: #d9d9d9;
  $brand-primary: $vue-green !default;
  $brand-danger: $theme-red;
  $brand-warning: $theme-orange;
  $brand-info: $theme-blue;
  $brand-success: $vue-green;
  $light-gray2: #eff4f5;
  $dark-gray: #282828;
  $gray: #adb3b9;
  $violet: #db76df;
  $dark-blue: #0045b6;

  .vuestic-tree-node {
    .form-group {
      margin-bottom: 0px;
    }
    display: flex;
    &-checkbox {
      margin-right: 0.75rem;
    }
    &-icon {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 0.375rem;
    }
    &-icon-right {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 0.375rem;
    }
    &-label {
      flex-grow: 1;
      word-wrap: break-word;
      overflow: hidden;
    }
    &-selected #{&}-label {
      background-color: $vue-light-green;
    }

    // HACK Checkbox for presentation page
    .vuestic-checkbox {
      margin-bottom: 0;
      margin-top: -0.125rem;
      margin-right: -0.625rem;
    }
  }
</style>

