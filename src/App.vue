<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script>


export default {
  name: 'App',

}
</script>

<style>
   html,body{ /*把四周白边去掉*/
     margin:0;
     padding:0
   }
   #app{
     height: 100vh;
   }
</style>
