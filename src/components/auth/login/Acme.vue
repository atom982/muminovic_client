
<template>
  <h3>Acme</h3>
</template>

<script>
  import {http} from '../../../../config/config.js'

  export default {
    data() {
      return {
  
      }
    },
    name: 'acme',

    mounted() {      
      http.get(this.$route, {
  
      }).then(res => {
        // console.log(res.data)
      })
    }
  }
</script>