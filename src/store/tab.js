// import router from '@/router'
import Cookie from 'js-cookie' 
export default {
  namespaced: true,
  state:{
    isCollapse:false,
    tabsList:[
      {
        path:'/home', 
        name:'home',
        label:'首页',
        icon:'home'
      }
    ],
    //代表现在选择的哪个标签
    currentMenu:null,
    //存放通过Mock请求过来的具有权限的菜单项
    menu:[]
  },
  mutations:{
    CollapseMenu(state){
      state.isCollapse = !state.isCollapse
    },
    //用来改变tabList的值
    selectMenu(state,val){
      if(val.name !== 'home'){
        state.currenMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result == -1){  //
            state.tabsList.push(val)
        }
      }else{
        state.currenMenu= null
      }
    },
    //当在tab标签内删除了某个标签 相应的tabsList内部也要删除
    closeTag(state,val){
      const result = state.tabsList.findIndex((item)=>item.name === val.name)
      state.tabsList.splice(result,1)
    },
    //有关Menu的一些方法
    setMenu(state,val){
      state.menu =val   //这个给侧边栏用
      //存在cookie中 防止刷新的时候丢失
      Cookie.set('menu',JSON.stringify(val))
    },
    clearMenu(state){
      state.menu=[]
      Cookie.remove('menu')
    },
    //为了达到路由动态添加的目的
    addMenu(state,router){
      //如果Cookie中没有路由信息，那就不用给state中的menu添加
      if(!Cookie.get('menu')){
        return
      }
      //如果有数据 处理后台拿来的数据
      const menu = JSON.parse(Cookie.get("menu"))
      state.menu = menu  
      const menuArray = []
      menu.forEach(item =>{
        //如果有二级路由
        if(item.children){
          item.children = item.children.map(item=>{
            //在原来的基础上添加路由信息  为了适应router--->index
            item.component = () => import(`../views/${item.url}`)
            return item
          })
          //将二维数组扁平化 因为有两层 
          menuArray.push(...item.children)
        }else{
          item.component = ()=>import(`../views/${item.url}`)
          menuArray.push(item)
        }
      })
   
      //路由的动态添加
      menuArray.forEach(item=>{
        //将得到的menuArray内的路由信息 添加到 路由Main的子路由中
        router.addRoute('Main',item)  //这个给路由
      })
    }
  }
}