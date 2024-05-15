import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

// router.beforeEach((to, from, next) => {
//   if(localStorage.token){
//     next()
//   }else{
//       router.push({name: "home"})
//   }
// })

console.log("main.js")

createApp(App).use(router).use(ElementPlus).mount('#app')
