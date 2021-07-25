import Vue from 'vue'
import App from './App'
import uView from "./uview-ui"
import store from './store/index'
import http from 'pages/utils/request.js'
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$http=http
App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
