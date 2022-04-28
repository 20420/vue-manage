//后端返回的token存储在vuex中，为了进一步保存，要存在cookie中，会话/本地存储中也可以
import Cookie from "js-cookie"
export default{
   namespaced: true,
   state:{
     token:""
   },
   mutations:{
     //设置Cookie
     setToken(state,val){
       state.token = val
       Cookie.set("token",val)
     },
     //清空Cookie
     clearToken(state){
       state.token=""
       Cookie.remove('token')
     },
     //获取Cookie
     getToken(state){
       //如果当前缓存中有token则直接获取  没有则从state中获取
        state.token = state.token || Cookie.get('token') 
     }
   }
}