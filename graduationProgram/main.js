import Vue from 'vue'
import App from './App'
import uView from "./uview-ui"
import store from './store/index'
import http from 'pages/utils/request.js'
import EventBus from 'pages/utils/bus.js'
Vue.use(uView);
Vue.use(EventBus)
Vue.config.productionTip = false
Vue.prototype.$store=store
Vue.prototype.$http=http
Vue.prototype.$EventBus=EventBus
App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
})
app.$mount()
