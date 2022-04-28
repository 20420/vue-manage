<template>
     <el-form 
      :model="form" 
      status-icon 
      :rules="rules" 
      ref="form" 
      label-width="100px"
      class="login-container"
    >
       <h3 class="login_title">系统登陆</h3>
       <el-form-item
         label="用户名"
         label-width="80px"
         prop="username"
         class="username"
       > 
         <el-input
           type='input'
           v-model="form.username"
           autocomplete="off"
           placeholder="请输入账号"
         ></el-input>
       </el-form-item>

       <el-form-item
         label="密码"
         label-width="80px"
         prop="password"
       >
         <el-input
           type='password'
           v-model="form.password"
           autocomplete="off"
           placeholder="请输入密码"
         ></el-input>
       </el-form-item>

        <el-form-item class="login_submit">
           <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>
     </el-form>
</template>

<script>
//通过Mock模拟生成token
// import Mock from "mockjs"
import {getMenu} from '../../../api/data.js'
export default {
  name:'loginName',
  data(){
    return {
       form:{
          password:'',
          username:''
       },
       rules:{
         username:[
           {
             required:true,
             message:'请输入用户名',
             trigger:"blur"
           },
           {
             min:3,
             message:"用户名长度不能小于3位",
             trigger:"blur"
           }
         ],
         password:[
           {
             required:true,
             message:'请输入密码',
             trigger:"blur"
           }
         ]
       }
    }
  },
  methods:{
    login(){
       getMenu(this.form).then(({data:res}) =>{
           if(res.code === 20000){
             //接口调用成功之后返回了菜单数据 可以对他们做操作
             //代替之前自己写的死的菜单信息
             this.$store.commit('tab/clearMenu')
             this.$store.commit('tab/setMenu',res.data.menu)
             this.$store.commit('token/setToken',res.data.token)
             //注意必须先setMenu之后才addMenu,因为先setMenu之后，cookie里面才会有值
             this.$store.commit('tab/addMenu',this.$router)
             this.$router.push({name:'home'})
           }else{
             //element-ui的组件
             this.$message.warning(res.data.message)
           }
       })
      // //通过Mock模拟生成一个token
      //  const token = Mock.random.guid()
      //  this.$store.commit('setToken',token)
      //  //登录成功跳转到首页 但在此之前会导航守卫一下
      //  this.$router.push({name:'home'})
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container{
     border-radius: 15px;
     // background-clip:border-box | padding-box  | content-box
     //设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面
     background-clip:padding-box;
     margin:180px auto;
     width:350px;
     padding:35px 35px 15px 35px;
     background-color:#fff;
     border:1px solid #eaeaea;
     box-shadow:0 0 25px #cac6c6;
  }
  
  .login_title{
    margin-bottom:40px;
    text-align: center;
    color:#505458
  }

  .login_submit{
    margin:10px auto
  }
</style>