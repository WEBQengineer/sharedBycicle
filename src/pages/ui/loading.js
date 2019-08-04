import React, { Component } from 'react';
import { Card, Button, Spin, Icon, Alert } from 'antd';
import './ui.less';

export default class Loadings extends Component{
  render(){
    const icon = (<Icon type='loading'/>);
    return (
      <div>
        <Card title='Spin用法' className='card-wrap'>
          <Spin size="small" />
          <Spin spinning={true}/>
          <Spin size="large"/>
          <Spin indicator={icon}/>
        </Card>
        <Card title='内容遮罩' className='card-wrap'>
          <div className='loading'>
            <Alert 
              message='React'
              description='React是由Facebook公司开发的'
              type='info'
            />
          </div>
          <div className='loading'>
            <Alert 
              message='React'
              description='React是由Facebook公司开发的'
              type='warning'
            />
          </div>
          <div className='loading'>
            <Spin
              // spinning={false}
            >
              <Alert 
                message='这里是模拟加载中的状态'
                description='React是由Facebook公司开发的'
                type='success'
              />
            </Spin>
          </div>
          <div className='loading'>
            <Spin
              tip='加载中……'
            >
              <Alert 
                message='这里是模拟加载中的状态'
                description='React是由Facebook公司开发的'
                type='success'
              />
            </Spin>
          </div>
        </Card>
      </div>
    )
  }
}