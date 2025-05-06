import { createApp } from 'vue'
import App from './App.vue'
import setupDirectives from './directives'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/scss/main.scss'

const app = createApp(App)

setupDirectives(app)

app.use(ElementPlus)
app.mount('#app')
