<template>
  <header>
    <div class="l-content">
      <el-button @click='handleMenu'   plain  icon='el-icon-menu'  size = 'mini'></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
        <!-- 下拉菜单组件 -->
        <el-dropdown trigger="click" size="mini" >
          <span>
            <img class = 'user' :src="userImage" >
          </span>
           <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <!-- 当给一个组件添加点击事件的时候需要加native，若是一个普通html元素则不需要
              这里的el-dropdown-item是一个组件 -->
              <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from "vuex"
export default {
    name:"CommonHeader",
    data(){
      return{
         userImage: require('../assets/images/user-default.png') //为什么用required引入，否则会被解析为字符串形式 与import的区别
      }
    },
    methods:{
      handleMenu(){
         this.$store.commit('tab/CollapseMenu')
      },
      logOut(){
        //清除Token
        this.$store.commit('token/clearToken')
        //清除菜单
        this.$store.commit('tab/clearMenu')
        // this.$router.push({name:'login'})
        //跳转登录页
        this.$router.push('/login')
      }
    },
    computed:{
      ...mapState('tab',{
        tags: state => state.tabsList
      })
    }
}
</script>

<style lang="less" scoped>
  header {
     display:flex;
     height: 100%;  //如果不设置高度，那么父元素的高度由子元素的最高者决定，跟要求不和
     justify-content: space-between;
     align-items: center;
   }
   .l-content {
      display:flex;
      align-items: center;
      .el-button {
        margin-right: 20px;
      }
   }

   .r-content {
     .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
     }
   }

   //样式穿透  面包屑部分
   /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
     color: #fff;
   }

   /deep/ .el-breadcrumb__item .el-breadcrumb__inner{
     color: #C0C4CC;
   }

</style>