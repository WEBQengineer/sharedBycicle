//高德天气api// https://restapi.amap.com/v3/weather/weatherInfo?city=%E5%8C%97%E4%BA%AC&key=7d5319e0ab53508092dd0e713ece4b6e
//百度天气api   http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2
//http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=HFy9NSvdH3rgIaXmBoNHEOhpRhanoaG3
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import { getCurrentDate } from '../../utils/utils';
import axios from '../../axios';



export default class Header extends Component{
  state = {}
  //componentWillMount 在渲染前调用
  componentWillMount(){
    this.setState({
      userName: '陈志强'
    });
    //刷新当前时间
    setInterval(() => { 
      this.setState({
        sysTime:getCurrentDate()
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
      if(res.status == 'success'){
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl:data.dayPictureUrl,
          weather:data.weather
        })
      }
    })
  }

  render(){
    return(
      <div className='header'>
        <Row className='header-top'>
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href='#'>退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='breadcrumb-title'>
            首页
          </Col>
          <Col span={20} className='weather'>
            <span className='date'>{this.state.sysTime}</span>
            <span className='weather-img'>
              <img src={this.state.dayPictureUrl} alt=''/>
            </span>
            <span className='weather-detail'>
              {this.state.weather}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}