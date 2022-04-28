import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

//解决路由重复点击报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter) //全局引入

const router = new VueRouter({
  mode:'history',
  routes:[
    { 
     path:'/',  /*这个路径表明 一进页面就是这个路径对应的页面*/
     name:'Main',
     redirect:'/home',
     component:()=>import("../views/Main.vue"), /*实现按需引入  优化了*/
     children:[
        // {
        //   path:'home',
        //   name:'home', //与CommonAside里面的name保持一致
        //   component:()=>import('../views/home')
        // },
        // { 
        //   path:'user',
        //   name:'user',
        //   component:()=> import("../views/user")
        // },
        // { 
        //   path:'mall',
        //   name:'mall',
        //   component:()=> import("../views/mall")
        // },
        // { 
        //   path:'page1',
        //   name:'page1',
        //   component:()=> import("../views/other/page1.vue")
        // },
        // { 
        //   path:'page2',
        //   name:'page2',
        //   component:()=> import("../views/other/page2.vue")
        // }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:()=> import('../views/login/index.vue')
    }
  ]
})


router.beforeEach((to,from,next)=>{
  //页面刷新后，vuex中的数据丢失。这是因为：js代码是运行在内存中的，
  //代码运行时的所有变量、函数也都是保存在内存中的。进行刷新页面的操作，
  //以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以这些数据要
  //想存储就必须存储在外部，例如：Local Storage、Session Storage、Index DB等
  //防止页面刷新之后丢失token信息
  store.commit('token/getToken')
 //进行路由跳转之前 先获得token
 //有模块名 要加上模块名
  const token = store.state.token.token 
   //如果token不存在或者调转页面不是登录页  就不能让它跳转 要先转到登录页
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){ //防止现在已经是登录状态 导航到登录页面时  还能跳转
    next({name:'home'})
  }else{
    next()
  }
})

export default router