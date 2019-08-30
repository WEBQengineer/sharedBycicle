import React, { Component } from 'react';
import { Card } from 'antd';
import echartTheme from '../echartTheme';
// import echarts from 'echarts'; //加载所有的图表
//按需加载
import echarts from 'echarts/lib/echarts';
//导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component{

  componentDidMount(){
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
    title:{
      text:'环形饼图',
      x:'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
        backgroundColor:'rgb(128, 128, 128)',
        // borderColor:'rgba(128, 128, 128, 0.5)'
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ],
    color:['red','blue']
    });
    echarts.registerTheme('Imooc', echartTheme);
  }

  render(){
    return(
      <div>
        <Card>
          <div id='main' style={{ width: '100%', height: 600 }}></div>
        </Card>
      </div>
    );
  }
}