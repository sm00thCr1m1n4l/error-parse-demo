import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.baseURL='/api'
axios.defaults.headers={
  'Content-Type':'application/json'
}
Vue.config.devtools=true
Vue.config.productionTip = false
Vue.config.errorHandler = function(error, vm, info) {
  console.error(error)
  axios.post('/gen-source-code',{
    message:error.message,
    stack:error.stack
  },{

  }).then(({data:{errors,message}})=>{
    store.state.errors.push({
      errors:errors.positions,
      sourceCodeMap:errors.sourceCodeMap,
      message:message
    })
    
    console.log(data)
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
  provide(){
    return {
      
    }
  },
}).$mount('#app')
// try {
//   ''.asd()
// } catch (error) {
//   console.error(error)
//   axios.post('/gen-source-code',{
//     message:error.message,
//     stack:error.stack
//   },{

//   }).then(res=>{
//     console.log(res)
//   })
// }
