<template>
  <div class="form-group with-icon-left">
    <div class="input-group">
      <input id="input-icon-left" title=" " name="input-icon-left" @keyup="doFilter()" v-model="filterText" required/>
      <i class="glyphicon glyphicon-search icon-left input-icon search-icon"></i>
      <!-- Pretraga -->
      <label class="control-label" for="input-icon-left">{{'vuestic-components.trnslr001' | translate}}</label><i class="bar"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filterBar',
    data() {
      return {
        filterText: '' // this.$store.state.filter
      }
    },
    methods: {
      doFilter() { 
        this.$emit('filter', this.filterText)        
        // var current = this.$router.currentRoute.path;
        // if (!current.includes("/prijem")) {
        //   this.$emit('filter', this.filterText)
        //   this.$store.dispatch('filterChange', this.filterText)
        // }  
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-icon {
    transform: rotate(90deg);
  }
  
  .form-group {
    min-width: 7rem;
  }
  
  @media (max-width: 768px) {
    .form-group {
      width: 80%;
    }
  }
</style>
