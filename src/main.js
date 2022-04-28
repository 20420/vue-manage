import Vue from 'vue'
import App from './App.vue'
import {Button,Radio,Container,Main,Header,Aside,Menu,Submenu,MenuItem,MenuItemGroup,Dropdown,DropdownItem,DropdownMenu,Row,Col,Card,
  Table,TableColumn,Breadcrumb,BreadcrumbItem,Tag,Form,FormItem,Input,Select,Option,Switch,DatePicker,Dialog,Pagination,MessageBox,Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入全局样式
import './assets/less/index.less'

import router from './router'
import store from './store'

import axios from "axios"
import "../api/mock.js"

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)



Vue.prototype.$http = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message


new Vue({
  store,
  router,
  render: h => h(App),
  //解决刷新首页出现白屏问题
  //因为路由是动态添加的 一刷新路由就没有了 需要重新添加
  created(){
    store.commit('tab/addMenu',router)
  }
}).$mount('#app')
