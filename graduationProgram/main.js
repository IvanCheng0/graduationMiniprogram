import Vue from 'vue'
import App from './App'
<<<<<<< HEAD
import uView from "uview-ui"; //引入Uview
Vue.use(uView);

=======
import uView from "./uview-ui"
Vue.use(uView);
>>>>>>> 94aa3062b82865e3e9f1d2779bd40c441b5eb1ef
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
