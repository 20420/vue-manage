<template>
  <div>
    <!-- gutter指两栏之间的间隔 此处是8 和 16之间的间隔 -->
     <el-row :gutter="20" class='home'>
        <!-- 默认24格 -->
        <el-col :span="8" style="margin-top:20px">

            <el-card shadow = 'hover'> 
                <div class='user'>
                    <img :src="userImage">
                    <div class="userinfo">
                       <p class='name'>Admin</p>
                       <p class='access'>超级管理员</p>
                    </div>
                </div>
                <div class='login-info'>
                       <p>上次登录时间:<span>2022-4-22</span></p>
                       <p>上次登录地点:<span>南京</span></p>
                </div>
            </el-card>
             
             <el-card style = "margin-top: 20px;height:460px">
                <el-table :data = "tableData">
                    <el-table-column v-for="(val,key) in tableLabel" :key ='key' :prop ='key' :label='val'>
                    </el-table-column>
                </el-table>
             </el-card>
        </el-col>
        
        <el-col :span="16" style="margin-top:20px">
           <div class='num'>
              <el-card v-for="item in countData" :key="item.name" :body-style="{ display:'flex', padding: 0 }">
                <!-- 不知道用什么的时候可以用i -->
                 <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                 <div class="detail">
                    <p class='num'>￥{{item.value}}</p>
                    <p class='txt'>{{item.name}}</p>
                 </div>
              </el-card>
           </div>

           <el-card style="height:280px"> 
              <!-- <div style="height:280px" ref="echarts"></div> -->
               <echart :chartData="echartData.order" :isAxisChart="true" style="height:280px"></echart>
           </el-card>

           <div class="graph">
              <el-card style="height:265px">
                  <!-- <div style="height:240px" ref="useEcharts"></div> -->
                  <echart :chartData="echartData.user" :isAxisChart="true" style="height:240px"></echart>
              </el-card>
              <el-card style="height:265px">
                 <!-- <div style="height:240px" ref="videoEcharts"></div> -->
                 <echart :chartData="echartData.video" :isAxisChart="false"  style="height:240px"></echart>
              </el-card>
           </div>
        </el-col>
     </el-row>
  </div>
</template>

<script>
import { getHome } from '../../../api/data.js'
// import * as echarts from 'echarts'
//这是我们封装的echart组件
import Echart from '../../components/CommonEcharts.vue'

export default {
  name:'HomeName',
  data(){
    return {
        userImage: require('../../assets/images/user-default.png'),
        tableData:[],
        tableLabel:{
          name:'品牌',
          todayBuy:'今日购买',
          monthBuy:'本月购买',
          totalBuy:'总购买'
        },
        countData:[
          {
            name: "今日支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          }
        ],
        echartData:{
          //折线  根据请求回来的数据得到
          order:{
            xData:[],
            series:[]
          },
          //柱状
          user:{
            xData:[],
            series:[]
          },
          //饼状
          video:{
            series:[]
          }
        }
    }
  },
  components:{
      Echart
  },
  mounted(){
    //axios可以放在mounted中
    //通过axios从模拟接口Mock中取数据
    getHome().then(res => {
      console.log(res)
      const {code,data } = res.data 
      if(code == 20000){
        this.tableData = data.tableData

        //折线图
        const order = data.orderData
        //得到品牌的名字列表
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach( key=>{
          series.push({
            name:key,
            data: order.data.map(item => item[key]),
            type:'line'
          })
        })
        
        // const option = {
        //     xAxis:{
        //       data:order.date   //注意此处就是日期 
        //     },
        //     yAxis:{},
        //     legend:{
        //       data:keyArray 
        //     },
        //      // 提示框
        //     tooltip: {
        //       trigger: "axis",
        //     },
        //     series
        // }
        
        this.echartData.order.xData = order.date
        this.echartData.order.series = series

        //  const E = echarts.init(this.$refs.echarts) //ref帮助操作DOM节点
        //  E.setOption(option)

         //柱状图
        //  const userOption = {
        //       legend: {
        //         // 图例文字颜色
        //         textStyle: {
        //           color: "#333",
        //         },
        //       },
        //       grid: {
        //         left: "20%",
        //       },
        //       // 提示框
        //       tooltip: {
        //         trigger: "axis",
        //       },
        //       xAxis: {
        //         type: "category", // 类目轴
        //         data: data.userData.map(item => item.date),
        //         axisLine: {
        //           lineStyle: {
        //             color: "#17b3a3",
        //           },
        //         },
        //         axisLabel: {
        //           interval: 0,
        //           color: "#333",
        //         },
        //       },
        //       yAxis:{
        //           type: "value",
        //           axisLine: {
        //             lineStyle: {
        //               color: "#17b3a3",
        //             },
        //           },
        //       },
        //       color: ["#2ec7c9", "#b6a2de"],
        //       series: [
                   //name要与legend的保持一致（在legend存在的情况下），若其不存在，则以这个为准
        //         {
        //           name:'新增用户',
        //           data: data.userData.map(item=> item.new),
        //           type:'bar'
        //         },
        //         {
        //           name:'活跃用户',
        //           data: data.userData.map(item=> item.active),
        //           type:'bar'
        //         }
        //       ],
        //   }

          this.echartData.user.xData = data.userData.map(item => item.date)
          this.echartData.user.series =  [
                {
                  name:'新增用户',
                  data: data.userData.map(item=> item.new),
                  type:'bar'
                },
                {
                  name:'活跃用户',
                  data: data.userData.map(item=> item.active),
                  type:'bar'
                }
              ]
          // const U = echarts.init(this.$refs.useEcharts) //ref帮助操作DOM节点         
          //  U.setOption(userOption)
        
          //饼状图
          // const videoOption = {
          //     tooltip: {
          //       trigger: "item",
          //     },
          //     color: [
          //       "#0f78f4",
          //       "#dd536b",
          //       "#9462e5",
          //       "#a6a6a6",
          //       "#e1bb22",
          //       "#39c362",
          //       "#3ed1cf",
          //     ],
          //     series: [
          //       {
          //         data: data.videoData,
          //         type:"pie"
          //       }
          //     ]
          // }
          
          this.echartData.video.series = [
                {
                  data: data.videoData,
                  type:"pie"
                }
              ]
          // const V = echarts.init(this.$refs.videoEcharts) //ref帮助操作DOM节点         
          //  V.setOption(videoOption)
      }
    })
  }
}
</script>