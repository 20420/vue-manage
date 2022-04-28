<template>
   <div class="tabs">
       <!-- $route.name指当前页面的路由名字 此句话是用来控制哪里亮的-->
       <el-tag 
        v-for="(tag,index) in tags" 
        :key="tag.name" 
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'dark':'plain'" 
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        size='small'>
           {{tag.label}}
       </el-tag>
   </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
   name:'CommonTag',
   data(){
     return {

     }
   },
   computed:{
      ...mapState('tab',{
        tags:state => state.tabsList
        // tags:'tabsList'
      })
   },
   methods:{
     changeMenu(item){
        this.$router.push({
          name:item.name
        })
     },
    //  index用来判断现在移除的是哪一个
     handleClose(tag,index){
       const length = this.tags.length -1
       //点击删除的时候 需要把tablist里相应的内容删除
       this.close(tag)
       //如果当前选中的删除标签与当前路由不一致 则不需要改变焦点
       if(tag.name !== this.$route.name){
         return;
       }
       //如果删除的最右侧标签，则焦点会向右移动一位
       if(index == length){
         this.$router.push({name:this.tags[index-1].name})
       }else{
         //
         this.$router.push({
           name:this.tags[index].name
         })
       }

       
     },
     //引用删除tabsList的函数
     ...mapMutations('tab',{
       close:'closeTag'
     })
   }
}
</script>

<style lang="less" scoped>
  .tabs {
    padding:20px;
    .el-tag {
      margin-right: 15px;
      cursor:pointer
    }
  }
</style>