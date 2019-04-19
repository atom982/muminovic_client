<template>
  <div class="square-with-icon">
    <span class="icon">
      <i :class="iconClass" aria-hidden="true"/>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'square-with-icon',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    }
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
  
  .square-with-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 1.375rem;
    width: 1.375rem;
    color: $white;
    background-color: $vue-green;
  }
</style>
