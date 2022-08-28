import { createApp } from 'vue'
import App from './App.vue'


import BootstrapVue3 from 'bootstrap-vue-3'

// Optional, since every component import their Bootstrap functionality
// the following line is not necessary
// import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
window.swal = require('sweetalert2') // added here



const app = createApp(App)

app.use(BootstrapVue3)
app.use(VueAxios, axios, VueSweetalert2)

app.mount('#app')