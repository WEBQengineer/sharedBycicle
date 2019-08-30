import React, { Component } from 'react';
import { Card } from 'antd';
// import echartTheme from '../echartTheme';
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
    let myChart1 = echarts.init(document.getElementById('main1'));
    var builderJson = {
      "all": 10887,
      "charts": {
        "map": 3237,
        "lines": 2164,
        "bar": 7561,
        "line": 7778,
        "pie": 7355,
        "scatter": 2405,
        "candlestick": 1842,
        "radar": 2090,
        "heatmap": 1762,
        "treemap": 1593,
        "graph": 2060,
        "boxplot": 1537,
        "parallel": 1908,
        "gauge": 2107,
        "funnel": 1692,
        "sankey": 1568
      },
      "components": {
        "geo": 2788,
        "title": 9575,
        "legend": 9400,
        "tooltip": 9466,
        "grid": 9266,
        "markPoint": 3419,
        "markLine": 2984,
        "timeline": 2739,
        "dataZoom": 2744,
        "visualMap": 2466,
        "toolbox": 3034,
        "polar": 1945
      },
      "ie": 9743
    };
    
    var downloadJson = {
      "echarts.min.js": 17365,
      "echarts.simple.min.js": 4079,
      "echarts.common.min.js": 6929,
      "echarts.js": 14890
    };
    
    var themeJson = {
      "dark.js": 1594,
      "infographic.js": 925,
      "shine.js": 1608,
      "roma.js": 721,
      "macarons.js": 2179,
      "vintage.js": 1982
    };
    
    var waterMarkText = 'ECHARTS';
    
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.08;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);
    var colors = ['#5793f3', '#d14a61', '#675bba'];
    myChart1.setOption({
        color: colors,
    
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '20%'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['蒸发量','降水量','平均温度']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '蒸发量',
                min: 0,
                max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '降水量',
                min: 0,
                max: 250,
                position: 'right',
                offset: 80,
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
            {
                type: 'value',
                name: '温度',
                min: 0,
                max: 25,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value} °C'
                }
            }
        ],
        series: [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
                name:'降水量',
                type:'bar',
                yAxisIndex: 1,
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
                name:'平均温度',
                type:'line',
                yAxisIndex: 2,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
        ]
    }
    )
    // ======================================================================================================
    // ======================================================================================================
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('main'));
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];

    for (var i = 0; i < 10; i++) {
        xAxisData.push('Class' + i);
        data1.push((Math.random() * 2).toFixed(2));
        data2.push(-Math.random().toFixed(2));
        data3.push((Math.random() * 5).toFixed(2));
        data4.push((Math.random() + 0.3).toFixed(2));
    }

    var itemStyle = {
        normal: {
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };
    // 绘制图表
    myChart.setOption({
      backgroundColor: '#eee',
      legend: {
          data: ['bar', 'bar2', 'bar3', 'bar4'],
          align: 'left',
          left: 10
      },
      brush: {
          toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
          xAxisIndex: 0
      },
      toolbox: {
          feature: {
              magicType: {
                  type: ['stack', 'tiled']
              },
              dataView: {}
          }
      },
      tooltip: {},
      xAxis: {
          data: xAxisData,
          name: 'X Axis',
          silent: false,
          axisLine: {onZero: true},
          splitLine: {show: false},
          splitArea: {show: false}
      },
      yAxis: {
          inverse: true,
          splitArea: {show: false}
      },
      grid: {
          left: 100
      },
      visualMap: {
          type: 'continuous',
          dimension: 1,
          text: ['High', 'Low'],
          inverse: true,
          itemHeight: 200,
          calculable: true,
          min: -2,
          max: 6,
          top: 60,
          left: 10,
          inRange: {
              colorLightness: [0.4, 0.8]
          },
          outOfRange: {
              color: '#bbb'
          },
          controller: {
              inRange: {
                  color: '#2f4554'
              }
          }
      },
      series: [
          {
              name: 'bar',
              type: 'bar',
              stack: 'one',
              itemStyle: itemStyle,
              data: data1
          },
          {
              name: 'bar2',
              type: 'bar',
              stack: 'one',
              itemStyle: itemStyle,
              data: data2
          },
          {
              name: 'bar3',
              type: 'bar',
              stack: 'two',
              itemStyle: itemStyle,
              data: data3
          },
          {
              name: 'bar4',
              type: 'bar',
              stack: 'two',
              itemStyle: itemStyle,
              data: data4
          }
      ]
  })
    myChart.on('brushSelected', this.renderBrushed);
      
}
renderBrushed(params) {
  var brushed = [];
  var brushComponent = params.batch[0];

  for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
      var rawIndices = brushComponent.selected[sIdx].dataIndex;
      brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
  }
  var myChart = echarts.init(document.getElementById('main'));
  myChart.setOption({
      title: {
          backgroundColor: '#333',
          text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
          bottom: 0,
          right: 0,
          width: 100,
          textStyle: {
              fontSize: 12,
              color: '#fff'
          }
      }
  });
}
render(){
    return(
      <div>
        <Card title="柱形图表之一">
          <div id='main' style={{ width: '100%', height: 900 }} ></div>
        </Card>
        <Card title="柱形图表之一">
          <div id='main1' style={{ width: '100%', height: 600 }} ></div>
        </Card>
      </div>
    );
  }
}