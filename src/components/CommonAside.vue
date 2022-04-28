<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{isCollapse ?'后台':'通用后台管理系统'}}</h3>
    
    <!-- //没有子项目  注：inde是字符串形式-->
    <el-menu-item  @click = "clickMenu(item)" v-for="item in noChildren" :key='item.path' :index="item.path+''">
      <i :class="'el-icon-' + item.icon " ></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    
    <!-- 有子项目 -->
    <el-submenu v-for="item in hasChildren" :key='item.path' :index="item.path+''">
      <template slot="title">
        <i :class=" 'el-icon-' + item.icon "></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click = "clickMenu(subItem)" :index="subItem.path+''">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        menu:[
          // {
          //   path: '/home', 
          //   name: 'home',
          //   label: '首页',
          //   icon: 's-home',
          //   // url: 'Home/Home'
          // },
          // {
          //   path: '/mall',
          //   name: 'mall',
          //   label: '商品管理',
          //   icon: 'video-play',
          //   // url: 'MallManage/MallManage'
          // },
          // {
          //   path: '/user',
          //   name: 'user',
          //   label: '用户管理',
          //   icon: 'user',
          //   // url: 'UserManage/UserManage'
          // },
          // {
          //   label: '其他',
          //   icon: 'location',
          //   children: [
          //     {
          //       path: '/page1',
          //       name: 'page1',
          //       label: '页面1',
          //       icon: 'setting',
          //       // url: 'Other/PageOne'
          //     },
          //     {
          //       path: '/page2',
          //       name: 'page2',
          //       label: '页面2',
          //       icon: 'setting',
          //       // url: 'Other/PageTwo'
          //     }
          //   ]
          // }
       ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        //编程式导航
        this.$router.push({
          name:item.name
        })
        //面包屑部分
        this.$store.commit('tab/selectMenu',item)

      }
    },
    computed:{
      //把没有孩子的取出来 一级菜单
      noChildren(){
        // return this.menu.filter(item =>!item.children)
        return this.asyncMenu.filter(item =>!item.children)
      },
      //把有孩子的取出来 一级加二级菜单
      hasChildren(){
        // return this.menu.filter(item => item.children)
        return this.asyncMenu.filter(item => item.children)
      },
      //从store中拿到isCollapse值
      isCollapse(){
        return this.$store.state.tab.isCollapse
      },
      //获取menu
      asyncMenu(){
        return this.$store.state.tab.menu
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) { //element-ui自带的  与折叠效果有关
    width: 200px;
    min-height: 400px;
    }
   .el-menu {
     height:100%;
     border:none;
     h3{
       color:#fff;
       text-align:center;
       line-height:48px;
     }
   }
  
</style>