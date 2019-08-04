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
  //是否显示modal框
  handleOpen = (type) => {
    this.setState({
      [type]:true
    })
  }

  handleConfirm = (type) => {
    Modal[type]({
      title: '确认?',
      content: 'React是由Facebook公司开发的',
      onOk(){
        console.log('点击了确认')
      },
      onCancel(){
        console.log('点击了取消')
      }
    })
  }
  showConfirm = () => {
    Modal.confirm({
      title: '用下面这个判断条件模拟请求接口',
      content: '判断条件是：a123 > 0.5 ? resolve : reject',
      onOk() {
        let a123 = Math.random();
        return new Promise((resolve, reject) => {
          setTimeout(a123 > 0.5 ? resolve : reject, 1000);
        }).then(function(){alert('模拟接口请求成功'+a123)}).catch(() => alert('本次模拟接口请求失败!'));
      },
      onCancel() {}
    });
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

        <Card title='信息确认框' className='card-wrap'>
          <Button type='primary' onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
          <Button type='primary' onClick={() => this.handleConfirm('info')}>InFo</Button>
          <Button type='primary' onClick={() => this.handleConfirm('success')}>Success</Button>
          <Button type='primary' onClick={() => this.handleConfirm('warning')}>Warning</Button>
          <Button type='primary' onClick={() => this.handleConfirm('error')}>error</Button>
        </Card>

        
        <Card title='模拟接口请求' className='card-wrap'>
          <Button type='primary' onClick={() => this.showConfirm()}>Confirm</Button>
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
          <p>模拟请求接口数据，点击OK，2秒后自动关闭</p>
        </Modal>


        <Modal
          title='React'
          visible={this.state.showModal3}
          style={{top:20}}
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}
          onOk={() => {
            this.setState({
              showModal3: false
            })
          }}
        >
          <p>欢迎使用本网站</p>
        </Modal>

        <Modal
          title='React'
          visible={this.state.showModal4}
          wrapClassName='vertical-center-modal'
          onCancel={() => {
            this.setState({
              showModal4: false
            })
          }}
          onOk={() => {
            this.setState({
              showModal4: false
            })
          }}
        >
          <p>欢迎使用本网站</p>
        </Modal>
        
      </div>
    );
  }
}