import React, { Component } from 'react';
import { Card, Button, Table , Form, Select, Modal, Input, message } from 'antd';
import axios from '../../axios/index';
import Util from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends Component{

  state={
    list:[],
    isShowOpenCity:false
  }

  params={
    page:1
  }

  //开通城市
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity:true
    })
  }

  //开通城市提交按钮
  handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    axios.ajax({
      url:'/city/open',
      data:{
        params:cityInfo,
        isShowLoading:true
      }
    }).then((res)=>{
      if(res.code == 0){
        message.success(`这里获取到数据：城市${cityInfo.city_id}, 营运模式：${cityInfo.op_mode}, 用车模式${cityInfo.use_mode}`)
        this.setState({
          isShowOpenCity:false
        })
      }
    })    
  }

  componentDidMount() {
    this.requestList();
  }

  //接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data:{
        params:{
          page:this.params.page
        }
      }
    }).then((res)=>{
      let list = res.result.item_list.map((item,index)=>{
        item.key = index;
        return item;  //一定要return
      });
      this.setState({
        list,
        pagination:Util.pagination(res,(current)=>{
          _this.params.page = current;
          _this.requestList();
        })
      })
    })
  }



  render(){
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title:'用车模式',
        dataIndex: 'mode',
        render(mode){
          return mode ==1 ? '停车点':'禁停区';
        }
      }, {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode){
          return op_mode == 1 ? '自营':'加盟';
        }
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr){
          return arr.map((item)=>{
            return item.user_name;
          }).join(',');//加.join把数组转成字符串。接口返回的是对象数组，这里无法识别，所以要通过map遍历转成字符串
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'updata_time'
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ]

    return(
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{marginTop:10}}>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className='content-wrap'>
          <Table
            columns={columns}
            bordered
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal 
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onCancel={()=>{
            this.setState({
              isShowOpenCity:false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm  wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
        </Modal>
      </div>
    );
  }
}


class FilterForm extends Component{
    //重置按钮
    handleReset = () => {
      this.props.form.resetFields();
    };
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout='inline'>
        <FormItem label='城市'>
          {
            getFieldDecorator('city_id')(
              <Select
                placeholder='全部'
                style={{width:90}}
              >
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>天津市</Option>
                <Option value='3'>深圳市</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='用车模式'>
            {
              getFieldDecorator('mode')(
                <Select
                  placeholder='全部'
                  style={{width:135}}
                >
                  <Option value=''>全部</Option>
                  <Option value='1'>指定停车点模式</Option>
                  <Option value='2'>营运模式</Option>
                </Select>
              )
            }
        </FormItem>

        <FormItem label='营运模式'>
            {
              getFieldDecorator('op_mode')(
                <Select 
                  placeholder='全部'
                  style={{width:80}}
                >
                  <Option value=''>全部</Option>
                  <Option value='1'>自营</Option>
                  <Option value='2'>加盟</Option>
                </Select>
              )
            }
        </FormItem>

        <FormItem label='加盟商授权状态'>
          {
            getFieldDecorator('auth_status')(
              <Select
                placeholder='全部'
                style={{width:90}}
              >
                <Option value=''>全部</Option>
                <Option value='1'>已授权</Option>
                <Option value='2'>未授权</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem>
          <Button type='primary' style={{margin: '0 20px'} }>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create()(FilterForm);

class OpenCityForm extends Component{
  render(){
    const formItemLayout = {
      labelCol:{
        span:4
      },
      wrapperCol:{
        span:10
      }
    }
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout='horizontal'>
        <FormItem label='选择城市' {...formItemLayout}>
          {
            getFieldDecorator('city_id')(
              <Select>
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>天津市</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='营运模式' {...formItemLayout}>
          {
            getFieldDecorator('op_mode')(
              <Select>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='用车模式' {...formItemLayout}>
          {
            getFieldDecorator('use_mode')(
              <Select>
                <Option value='1'>指定停车点</Option>
                <Option value='2'>禁停区</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create()(OpenCityForm);