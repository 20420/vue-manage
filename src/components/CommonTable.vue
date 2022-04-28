<template>
  <div class="common-table">
     <!-- //表占90% 分页占10%  stripe斑马样式 height="90%"什么意思？-->
     <el-table :data="tableData" height="90%" stripe>
        <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
        <el-table-column 
          show-overflow-tooltip 
          v-for="item in tableLabel" 
          :key="item.prop" 
          :label="item.label"
          :width="item.width ? item.width : 125" 
        > 
           <!--当有个别列为特殊列既需要自定义内容列式，用下面这个-->
           <!-- scope.row指tableData的行信息 -->
           <!-- element-ui的格式 -->
           <template slot-scope="scope">
             <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
           </template> 
        </el-table-column>

        <el-table-column label='操作' min-width='180'>
            <!-- 将当前行的数据传递过去 -->
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
            
        </el-table-column>
     </el-table>

     <!-- 分页符部分 -->
     <!-- total总数 page当前页面数 -->
     <!-- current-change当前页数改变时会触发 -->
     <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="localConfig.total"
      :current-page.sync="localConfig.page"
      @current-change="changePage"
      :page-size="20"
     >
     </el-pagination>
  </div>
</template>

<script>
export default {
   name:'CommonTable',
   props:{
     tableData: Array,
     tableLabel: Array,
     config: Object
   },
   data(){
     return{
       localConfig : this.config
     }
   },
   methods:{
     handleEdit(row){
        this.$emit('edit',row)
     },
     handleDelete(row){
        this.$emit('del',row)
     },
     changePage(page){
        this.$emit('changePage',page)
     }
   }
}
</script>

<style lang="less" scoped>
  .common-table{
    //减去头部区域的高度  
    //注意一定要有空格！！！！！！！！
    height: calc( 100% - 62px);
    background-color: #fff;
    position:relative;
    //分页标签的位置
    .pager{
      position:absolute;
      bottom:0;
      right:20px
    }
  }  
</style>