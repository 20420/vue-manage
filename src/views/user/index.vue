<template>
  <div class="manage">
      <!-- el-dialog是带缓存的，除了第一次打开会初始化其他时候会直接走缓存，导致点击编辑第一个人信息的时候再点击其他人，弹出的内容没变 -->
      <!-- 故每次关闭都要销毁 这就想到了v-if v-show ，这里选择v-if -->
      <div v-if="isShow">
           <!-- 弹窗 -->
           <!-- sync指同步动态双向的来表示visible的值 -->
          <el-dialog :title="operateType === 'add'? '新增用户':'更新用户'" :visible.sync="isShow" >
          <!-- 用来给表单组件传递真实值 -->

          <common-form :formLable="operateFormLabel" :form="operateForm" :inline="true" ref='form'>
          </common-form>
          
            <!-- 对弹窗底部自定义  确定与取消 -->
            <!-- slot='footer'是element-ui组件自定义的 -->
          <div slot='footer' class='dialog-footer'>
              <el-button @click="isShow = false">取消</el-button>
              <el-button type='primary' @click = 'confirm'>确定</el-button>
          </div>
          </el-dialog>
      </div>

      <!-- 顶部区域 -->
      <div class="manage-header">
        <el-button type="primary" @click="addUser">+ 新增</el-button>
        <common-form :formLable="formLabel" :form="searchForm" :inline="true" ref='form'>
            <!-- 为什么按钮可以写在这里,因为定义组件的时候预留了一个位置slot -->
            <!-- 目前还没有实现搜索功能？？？？？？ -->
           <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
        </common-form>
      </div>

      <!-- 内容区域 -->
      <!-- config对应分页 -->
      <common-table 
       :tableData="tableData" 
       :tableLabel="tableLabel" 
       :config="config"
       @changePage="getList()"
       @edit ='editUser'
       @del="delUser"
      > 
       </common-table>  
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue"
import CommonTable from "../../components/CommonTable.vue"
import { getUser } from "../../../api/data.js"
export default {
  name:'UserName',
  data(){
    return {
       operateType:'add',
       isShow:false,
       operateFormLabel:[
            {
                model: 'name',
                label: '姓名',
                type: 'input'
            },
            {
                model: 'age',
                label: '年龄',
                type: 'input'
            },
            {
                model: 'sex',
                label: '性别',
                type: 'select',
                opts: [
                    {
                        label: '男',
                        value: 1
                    },
                    {
                        label: '女',
                        value: 0
                    }
                ]
            },
            {
                model: 'birth',
                label: '出生日期',
                type: 'date'
            },
            {
                model: 'addr',
                label: '地址',
                type: 'input'
            }
        ],
       operateForm:{
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        },
        //顶部区域的表单标签
        formLabel:[
          {
           model:"keyword",
           label:'',
           type:'input'
          }
        ],
        //顶部区域的表单数据
        searchForm:{
           keyword:''
        },
        tableData:[],
        tableLabel:[
          {
            prop:"name",
            label:"姓名" 
          },
          {
            prop:"age",
            label:"年龄" 
          },
          {
            prop:"sexLabel",
            label:"性别" 
          },
          {
            prop:"birth",
            label:"出生日期",
            width: 200
          },
          {
            prop:"addr",
            label:"地址",
            width:320
          }
        ],
        config:{
          page:1,
          total:30
        }
        
    }
  },
  components:{
    CommonForm,
    CommonTable
  },
  methods:{
    confirm(){
       if(this.operateType === 'edit'){
         //发出了请求 没用封装的axios 然后Mock进行拦截
          this.$http.post('/user/edit',this.operateForm).then(res =>{
            //关闭弹窗
            this.isShow = false
            console.log(res)
            //不要忘记这里也要调用 编辑了之后也要进行数据重置
            this.getList()
          })
        }else{
          this.$http.post('/user/add',this.operateForm).then(res =>{
            this.isShow = false
            console.log(res)
          //不要忘记这里也要调用 新增了之后也要进行数据重置
            this.getList()
          })
        }
    },
    addUser(){
       this.isShow = true
       this.operateType = 'add'
       //表单数据初始化
       this.operateForm ={
          name:'',
          addr:'',
          age:'',
          birth:'',
          sex:''
        }
    },
    //这个函数有问题 ？？？？
    getList(name=''){
      this.config.loading = true
      //若存在则从第一页开始搜索
      name ? (this.config.page = 1) : ''
      getUser({
         page:this.config.page,
         name
       }).then(({data:res})=>{
         this.tableData = res.list.map(item => {
           item.sexLabel = item.sex === 0 ?'女':'男'
           return item
         })
         this.config.total = res.count
         this.config.loading = false
       })
    },
    editUser(row){
       this.operateType = 'edit'
       this.isShow = true
      //  编辑的时候当前行的数据
      //vue双向绑定的弊端，实时更新数据，因为是一个数据源，在编辑页面修改数据导致原来数据也被更改了
      //原因：子组件Table的edit监听事件传出来的row是table中的一整列数据，该数据是Object类型，共享堆空间
      //解决办法：深拷贝 或者 浅拷贝
      //取消也修改的问题 解决了
       this.operateForm = JSON.parse(JSON.stringify(row))
        

    },
    delUser(row){
      // this.$confirm表示一个弹出框 element-ui里的
      this.$confirm('此操作将永久删除该组件，是否继续',"提示",{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        const id =row.id
        // 去定义/user/del这个api
        this.$http.post('/user/del',{
          params:{id}
        }).then(() =>{
          // this.$message也是一个element-ui组件
          this.$message({
            type:'success',
            message:'删除成功'
          })
          this.getList()
        })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    }
  },
  created(){
    //生命周期一开始就要有数据 所以一开始就要调用
    this.getList()
  }
}
</script>

<style lang="less" scoped>
  .manage{
    .manage-header {
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
  }

</style>