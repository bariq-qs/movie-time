import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'primevue/resources/themes/lara-dark-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import '@/styles/css/tailwind.css'
import '@/styles/scss/main.scss'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
