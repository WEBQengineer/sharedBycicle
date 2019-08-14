import React, { Component } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

export default class Carousels extends Component{
  render(){
    return(
      <div>
        <Card title='轮播--渐变展示' className='card-wrap'>
          <Carousel autoplay effect='fade'>
            <div>React是由Facebook公司开发的</div>
            <div>react全家桶</div>
            <div>React是由Facebook公司开发的</div>
            <div>Node.js</div>
          </Carousel>
        </Card>

        <Card title='图片背景轮播' className='slider-wrap'>
          <Carousel autoplay >
            <div><img src='/carousel-img/carousel-1.jpg' alt=''/></div>
            <div><img src='/carousel-img/carousel-2.jpg' alt=''/></div>
            <div><img src='/carousel-img/carousel-3.jpg' alt=''/></div>
          </Carousel>
        </Card>
      </div>
    );
  }
}