import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '../vue/App.vue'
import AuthStore from '../vue/store/authStore'
import Router from '../vue/router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle'


import Login from '../vue/components/Login.vue'
import Navbar from '../vue/components/widgets/Navbar.vue'
import TablePoints from '../vue/components/widgets/TablePoints.vue'
import Toast from '../vue/components/widgets/Toast.vue'
import ToastContainer from '../vue/components/widgets/ToastContainer.vue'
import authStore from '../vue/store/authStore'
import gameStore from '../vue/store/gameStore'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.component('Login',Login)
Vue.component('Navbar',Navbar)
Vue.component('TablePoints',TablePoints)
Vue.component('ToastContainer', ToastContainer)
Vue.component('Toast', Toast)

const router = new VueRouter(Router)
const store = new Vuex.Store({
    modules:{
        auth: authStore,
        game: gameStore,
    }
})

Vue.config.devtools = true

let app = new Vue({
    el: '#App',
    router,
    store,
    render: h=> h(App)
})

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor

export { store };