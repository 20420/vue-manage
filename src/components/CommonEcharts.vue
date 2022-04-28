<template>
   <div ref= "echart"></div>
</template>

<script>  
import * as echarts from "echarts"   //5版本echarts的引入
export default {
    //从引用这个组件的父组件中传递过来数据，传来的数据可以在下方被使用
    //相当于父子通信
    props:{
      isAxisChart:{ //用于区分到底是哪种图
          type:Boolean,
          default:true
      },
      //引入进来的初始数据
      chartData:{
        type:Object,
        //为什么要用函数形式？
        default(){
          return {
            xData:[],
            series:[]
          }
        }
      }
    },
    data(){
      return {
        //折线图和柱状图的配置 
         axisOption:{
            legend: {
              // 图例文字颜色
              textStyle: {
                color: "#333",
              },
            },
            grid: {
              left: "20%",
            },
            // 提示框
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category", // 类目轴
              data: [],
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",
              },
            },
            yAxis: [
              {
                type: "value",
                axisLine: {
                  lineStyle: {
                    color: "#17b3a3",
                  },
                },
              },
            ],
            series: [],
          },
          //饼状图的配置
          normalOption: {
              tooltip: {
                trigger: "item",
              },
              color: [
                "#0f78f4",
                "#dd536b",
                "#9462e5",
                "#a6a6a6",
                "#e1bb22",
                "#39c362",
                "#3ed1cf",
              ],
              series: [],
          },
          echart:null //用于判断目前图表是否已经有了
      }
    },
    watch:{
       //监听 图表数据的变化
       chartData:{
          handler:function(){
            this.initChart()//调用方法
          },
          // immediate:true, //不能加  因为此时没有可用DOM
          deep:true
       }
    },
    methods:{
      //初始化表
       initChart(){
         this.initChartData()
         if(this.echart){
           this.echart.setOption(this.options)
         }else{
           this.echart = echarts.init(this.$refs.echart)
           this.echart.setOption(this.options)
         }
       },
      //初始化表数据的方法
       initChartData(){
          if(this.isAxisChart){
            this.axisOption.xAxis.data = this.chartData.xData
            this.axisOption.series = this.chartData.series
          }else{
            this.normalOption.series = this.chartData.series
          }
       }
    },
    computed:{
      options(){
        //如果isAxisChart存在就获取柱状图和折现图的配置，如果不存在就获取饼状图的配置
        return this.isAxisChart ? this.axisOption : this.normalOption   
      }
    }
}
</script>