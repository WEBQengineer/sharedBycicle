import React, { Component } from 'react';
import { Card, Button,Icon ,Radio } from 'antd';
import './ui.less';

export default class Buttons extends Component{
  state={
    loading:true,
    size:'default'
  };
  handleCloseLoading = () => {
    this.setState({
      loading:false
    });
  }
  handleChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  render(){
    return(
      <div>
        <Card title='基础按钮' className='card-wrap'>
          <Button type='primary'>主按钮</Button>
          <Button type='dashed'>虚线按钮</Button>
          <Button type='danger'>危险按钮</Button>
          <Button disabled>失效状态</Button>
          <Button>常规按钮</Button>
          <Button type="link">Link按钮</Button>
        </Card>

        <Card title='图形按钮' className='card-wrap'>
            <Button type='primary' icon='download'>
              Download
            </Button>
            <Button type='primary' icon='plus'>
              创建
            </Button>
            <Button icon='edit'>
              编辑
            </Button>
            <Button icon='delete'>
              删除
            </Button>
            <Button shape='circle' icon='search'></Button>
            <Button type='primary' icon='search'>搜索</Button>
            <Button shape='circle' icon='loading'></Button>
        </Card>

        <Card title='Loading按钮' extra={<a href="#">More</a>} className='card-wrap'>
          <Button type='primary' loading={this.state.loading}>确定</Button>
          <Button type='primary' shape='circle' loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape='circle' loading={this.state.loading}></Button>
          <Button type='primary' onClick={this.handleCloseLoading}>关闭</Button>
        </Card>

        <Card title='按钮组' className='card-wrap'>
          <Button.Group>
              <Button type='primary'>
                <Icon type='left' />
                Backward
              </Button>
              <Button type='primary'>
                Forward
                <Icon type='right' />
              </Button>
            </Button.Group>
        </Card>

        <Card className='card-wrap'>
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value='small'>小</Radio>
            <Radio value='default'>中</Radio>
            <Radio value='large'>大</Radio>
          </Radio.Group>
          <Button type='primary' size={this.state.size}>Hello</Button>
          <Button size={this.state.size} >Hello</Button>
          <Button type='dashed' size={this.state.size} >Hello</Button>
          <Button type='danger' size={this.state.size} >Hello</Button>
        </Card>






      </div>
    );
  }
}