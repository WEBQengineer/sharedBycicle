import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';


export default class Notice extends Component{

  openNotification = (type,direction) =>{
    if(direction){
      //这个config是全局配置，生效后接下来都按照这个生成
      notification.config({
        placement: direction
      })
    }
    notification[type]({
      message: '发工资了',
      description: '上个月应出勤22天，实出勤22天，Last month, 22 days should be on duty，Actual attendance for 22 days',
    });
  }


  render(){
    return (
      <div>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type='primary' onClick={()=>this.openNotification('success')} >success</Button>
          <Button type='primary' onClick={()=>this.openNotification('error')} >error</Button>
          <Button type='primary' onClick={()=>this.openNotification('info')} >info</Button>
          <Button type='primary' onClick={()=>this.openNotification('warning')} >warning</Button>
        </Card>
        <Card title='指定弹出位置' className='card-wrap'>
          <Button type='primary' onClick={()=>this.openNotification('success','topLeft')} >topLeft</Button>
          <Button type='primary' onClick={()=>this.openNotification('error','topRight')} >topRight</Button>
          <Button type='primary' onClick={()=>this.openNotification('info','bottomLeft')} >bottomLeft</Button>
          <Button type='primary' onClick={()=>this.openNotification('warning','bottomRight')} >bottomRight</Button>
        </Card>
      </div>
    );
  }
}