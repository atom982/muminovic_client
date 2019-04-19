<template>
  <div class="vuestic-tree-root">
      <slot/>
  </div>
</template>

<script>
  export default {
    name: 'vuestic-tree-root',
    methods: {
      /**
       * @public
       */
      collapse () {
        this.$nextTick(() => {
          this.$children.forEach(child => {
            if (child.$options.name === 'vuestic-tree-category') {
              child.collapse()
            }
          })
        })
      },
      /**
       * @public
       */
      expand () {
        this.$nextTick(() => {
          this.$children.forEach(child => {
            if (child.$options.name === 'vuestic-tree-category') {
              child.expand()
            }
          })
        })
      },
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
  
  .vuestic-tree-root {
    padding: 0.3125rem;
    // List items require padding. Somewhat hacky, but the only remaining option is using render functions.
    .vuestic-tree-category + .vuestic-tree-category, .vuestic-tree-node + .vuestic-tree-node, .vuestic-tree-category + .vuestic-tree-node, .vuestic-tree-node + .vuestic-tree-category {
      margin-top: 0.625rem;
    }
  }
</style>
