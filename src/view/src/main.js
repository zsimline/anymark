import Vue from 'vue'
import App from './App.vue'

import './assets/css/grid.css'
import './assets/fonts/icomoon/font.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
