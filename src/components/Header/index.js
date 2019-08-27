//高德天气api// https://restapi.amap.com/v3/weather/weatherInfo?city=%E5%8C%97%E4%BA%AC&key=7d5319e0ab53508092dd0e713ece4b6e
//百度天气api   http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
//http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=HFy9NSvdH3rgIaXmBoNHEOhpRhanoaG3
import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';



export default class Header extends Component{
  state = {
    // Loading_weather_data:'正在加载天气数据',
    spinning: true
  }
  //componentWillMount 在渲染前调用
  componentWillMount(){
    this.setState({
      userName: '陈志强'
    });
    //刷新当前时间
    setInterval(() => { 
      this.setState({
        sysTime:Util.getCurrentDate()
      });
    },1000);
    this.getWeatherAPIData();
  }
  //获取天气信息
  getWeatherAPIData() {
    let city = '北京';
    axios.jsonp({
      // url: 'https://restapi.amap.com/v3/weather/weatherInfo?city='+encodeURIComponent(city)+'&key=7d5319e0ab53508092dd0e713ece4b6e'
      url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=HFy9NSvdH3rgIaXmBoNHEOhpRhanoaG3'  
    }).then((res)=>{
        this.setState({
          Loading_weather_data:'',
          spinning: false
        })
        if(res.status == 'success'){
          let data = res.results[0].weather_data[0];
          let data2 = res.results[0];
          this.setState({
            dayPictureUrl:data.dayPictureUrl,
            weather:data.weather,
            currentCity:data2.currentCity
          })
        }            
    },()=>{
      alert('网络连接失败，请检查网络')
    })
  }

  render(){
    const menuType = this.props.menuType;
    return(
      <div className='header'>
        <Row className='header-top'>
          {
            menuType?<Col span={6} className='logo'>
                          <img src='/assets/logo-ant.svg' alt='' />
                          <span>shared bicycle</span>
                        </Col>:''
          }
          <Col span={menuType?18:24}>
            <span>欢迎，{this.state.userName}</span>
            <a href='#'>退出</a>
          </Col>
        </Row>
        {
          //通过设置menutype来控制是否展示面包屑
          menuType?'':
          <Row className='breadcrumb'>
            <Col span={4} className='breadcrumb-title'>
              首页
            </Col>
            <Col span={20} className='weather'>
              <Spin spinning={this.state.spinning} tip='天气信息加载中……' size="small"></Spin>
              <span className='date'>{this.state.sysTime}</span>
              <span className='weather-currentCity'>{this.state.currentCity}市</span>
              <span className='weather-img'>
                <img src={this.state.dayPictureUrl} alt=''/>
              </span>
              <span className='weather-detail'>
                {this.state.weather}
              </span>
            </Col>
          </Row>
        }
      </div>
    );
  }
}