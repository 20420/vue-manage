<template>
   <!-- 表单域标签的宽度 表单数据对象 行内表单模式 -->
  <el-form ref="form" label-width="100px" :model="form" :inline='inline'>
      <el-form-item v-for="item in formLable" :key="item.label" :label="item.label">
          <el-input
            v-if="item.type === 'input'"
           :placeholder="'请输入'+ item.label"
            v-model="localForm[item.model]"
           >
          </el-input>
          <!-- 错误问题：子组件不能对父组件传递过来的值做出改变 -->
          <el-switch  v-if="item.type==='switch'" v-model="localForm[item.model]" > </el-switch>

          <el-date-picker
            v-if="item.type==='date'"
            type="date"
            value-format = "yyyy-MM-dd"
            placeholder="选择日期"
            v-model='localForm[item.model]'
          >
          </el-date-picker>

          <el-select
            v-if="item.type==='select'"
            placeholder="请选择"
            v-model='localForm[item.model]'
          >
             <el-option
               v-for="item in item.opts"
               :key="item.value"
               :label="item.label"
               :value="item.value"
             > 
             </el-option>
          </el-select>
      </el-form-item>

      <!-- 扩展：当前组件都不满足  用插槽 后续的按钮用到这个了-->
      <el-form-item>
         <slot></slot>
      </el-form-item>
  </el-form>
</template>

<script>
export default {
    name:"CommonForm",
    props:{
      // formLabel 是标签数据
      // form是表单数据
      formLable: Array,
      form: Object,
      inline: Boolean
    },
    data(){
      return{
        localForm: this.form
      }
    }
}
</script>