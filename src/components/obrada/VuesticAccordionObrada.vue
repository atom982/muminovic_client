<template>
  <div class="vuestic-accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "vuestic-accordion-obrada",
  props: {
    expand: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastClickedTab: {}
    };
  },

  provide() {
    return {
      accordion: {
        onChildChange: (child, state) => this.onChildChange(child, state)
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},

  // beforeRouteEnter(to, from, next) {

  // },
  // beforeRouteLeave(to, from, next) {

  // },
  methods: {
    onChildChange(child, state) {
      // Expand means opening one collapse won't close others.
      if (this.expand) {
        return;
      }

      // No reaction when user closes collapse.
      if (state === false) {
        return;
      }

      this.$children.forEach(collapse => {
        if (collapse === child) {
          return;
        }
        collapse.collapse();
      });
    }
  }
};
</script>

<style lang="scss">
</style>
