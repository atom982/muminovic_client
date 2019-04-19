import Vue from 'vue'

// add translations directly to the application
Vue.i18n.add('ba', require('./ba.json'))
Vue.i18n.add('en', require('./en.json'))
Vue.i18n.add('hr', require('./hr.json'))
Vue.i18n.add('rs', require('./rs.json'))

// set the start locale to use
Vue.i18n.set('ba')

// set fallback for non-translated strings
Vue.i18n.fallback('ba')
