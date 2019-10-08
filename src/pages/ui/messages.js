import React, { Component } from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';

export default class Messages extends Component{
  info = (type) => {
    message[type]('This is a normal message');
  };

  info1 = () => {
    const hide = message.loading('3秒后自行移出', 0);
    setTimeout(hide,3000)
    // console.log(hide);//这个返回值hide，返回的是一个函数，从字面意义上看像是一个关闭message的功能
    // const hide =()=> message.loading('This is a normal message', 0);
    // setTimeout(hide, 1500);
  };
  
  info2 = () => {
    message
      .loading('Action in progress..', 1.5)
      .then(() => message.success('Loading finished', 1.5))
      .then(() => message.info('Loading finished is finished', 1.5));
  };

  render(){
    return(
      <div>
        <Card title='全局提示框' className='card-wrap'>
          <Button type='primary' onClick={()=>this.info('success')}>Success</Button>
          <Button type='primary' onClick={()=>this.info('info')}>Info</Button>
          <Button type='primary' onClick={()=>this.info('warning')}>Warning</Button>
          <Button type='primary' onClick={()=>this.info('error')}>Error</Button>
          <Button type='primary' onClick={()=>this.info('loading')}>Loading</Button>
        </Card>
        <Card title='异步自行移除' className='card-wrap'>
          <Button type='primary' onClick={this.info1}>Success</Button>
        </Card>
        <Card title='Promise接口' className='card-wrap'>
          <Button type='primary' onClick={this.info2}>Success</Button>
        </Card>
      </div>
    );
  }
}