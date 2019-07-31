import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';

export default class Modals extends Component{
  state = {
    showModal1:false,
    showModal2:false,
    showModal3:false,
    showModal4:false,
    confirmLoading: false
  };
  handleOpen = (type) => {
    this.setState({
      [type]:true
    })
  }



  render() {
    return(
      <div>
        <Card title='基础模态框' className='card-wrap'>
          <Button type='primary' onClick={() => this.handleOpen('showModal1')}>open</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal3')}>顶部20px</Button>
          <Button type='primary' onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Modal
          title='React'
          visible={this.state.showModal1}
          onCancel={()=>{
            this.setState({
              showModal1:false
            })
          }}
          onOk={()=>{
            this.setState({
              showModal1:false
            })
          }}
        >
          <p>欢迎学习react</p>
        </Modal>


        <Modal
          title='React'
          visible={this.state.showModal2}
          onText='好的'
          cancelText='算了'
          confirmLoading={this.state.confirmLoading}
          onCancel={()=>{
            this.setState({
              showModal2:false
            })
          }}
          onOk={()=>{
            this.setState({             
              confirmLoading: true
            })
            setTimeout(() => {
              this.setState({
                showModal2:false,
                visible: false,
                confirmLoading: false,
              });
            }, 2000);
          }}
        >
          <p>欢迎学习react</p>
        </Modal>
      </div>
    );
  }
}