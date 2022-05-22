import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'


axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.headers = {
    'Access-Control-Allow-Origin': ' *'
};

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(Notifications)


app.mount('#app')
