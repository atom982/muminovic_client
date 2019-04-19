import { Pie } from 'vue-chartjs'
import DefaultOptions from '../DefaultOptions'

export default Pie.extend({
  props: ['data', 'options'],

  data () {
    return {
      defaultOptions: {

      }
    }
  },

  mounted () {
    setTimeout(() => { 
      let options = Object.assign({}, DefaultOptions, this.defaultOptions, this.options)
      this.renderChart(this.data, options)
    }, 600);   
  }
})
