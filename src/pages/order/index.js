import React, { Component } from 'react';
import { Card, Button, Table , Form, Select, Modal, Input, message, DatePicker } from 'antd';
import BaseForm from '../../components/BaseForm/index';
import ETable from '../../components/ETable/index';
import axios from '../../axios/index';
import Util from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends Component{
  state = {
    orderConfirmVisble:false,
    orderInfo:{},
    selectedItem:{}
  }
  params = {
    page:1
  }
  //form配置数据
  formList = [
    {
      type:'SELECT',
      label:'城市',
      field:'city',
      placeholder:'全部',
      initialValue:'0',
      width:90,
      list:[{ id: '0', name:'全部' },{ id: '1', name:'北京' },{ id: '2', name:'天津' },{ id: '3', name:'上海' }]
    },{
      type:'时间查询'
    },{
      type:'SELECT',
      label:'订单状态',
      field:'order_status',
      placeholder:'全部',
      initialValue:'0',
      width:90,
      list:[{ id: '0', name:'全部' },{ id: '1', name:'进行中' },{ id: '2', name:'结束行程' }]
    }
  ]

  componentDidMount(){
    this.requestList();
  }

  handleFilter = (params)=>{
    this.params = params;
    this.requestList();
  }

  requestList = () => {
    axios.requestList(this,'/order/list',this.params,true)
  }

  //结束订单
  handleConfirm = () => {
    let item = this.state.selectedItem;
    console.log(item);
    if(Object.keys(item).length == 0){  //ES6的新方法, 返回值是对象中属性名组成的数组
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      });
      return;
    }else{
      this.setState({
        orderConfirmVisble:true
      })
    }
  }

  //结束订单onOk
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios.ajax({
      url:'/order/finish_order',
      data:{
        params:{
          orderId:item.id
        }
      }
    }).then((res) => {
      if(res.code == 0){
        message.success('订单结束成功')
        this.setState({
          orderConfirmVisble:false
        });
        this.requestList()
      }
    })
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if(Object.keys(item).length == 0){  //ES6的新方法, 返回值是对象中属性名组成的数组
      Modal.info({
        title: '信息',
        content: '您还未选择订单'
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`,'_blank')
  }

  render(){
    const columns = [
      {
          title:'订单编号',
          dataIndex:'order_sn'
      },
      {
          title: '车辆编号',
          dataIndex: 'bike_sn'
      },
      {
          title: '用户名',
          dataIndex: 'user_name'
      },
      {
          title: '手机号',
          dataIndex: 'mobile'
      },
      {
          title: '里程',
          dataIndex: 'distance',
          render(distance){
            return distance/1000+'Km'
          }
      },
      {
          title: '行驶时长',
          dataIndex: 'total_time'
      },
      {
          title: '状态',
          dataIndex: 'status',
          render(status){
            return status ==1 ? '行程结束':'进行中'
          }
      },
      {
          title: '开始时间',
          dataIndex: 'start_time'
      },
      {
          title: '结束时间',
          dataIndex: 'end_time'
      },
      {
          title: '订单金额',
          dataIndex: 'total_fee'
      },
      {
          title: '实付金额',
          dataIndex: 'user_pay'
      }
    ]
    //结束订单弹框栅格布局
    const formItemLayout = {
      labelCol:{
        span:6
      },
      wrapperCol:{
        span:18
      }
    }


    return(
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginTop:10}}>
          <Button type='primary' onClick={this.openOrderDetail} >订单详情</Button>
          <Button type='primary' style={{marginLeft:20}} onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        {/* <Card>
          <Table
            columns={columns}
            dataSource={this.state.list}
            rowSelection = {{
              type:'checkbox'
            }}
          >

          </Table>
        </Card> */}
        <div className='content-wrap'>
          <ETable
            updateSelectedItem={Util.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            // selectedIds={this.state.selectedIds}
            // selectedItem={this.state.selectedItem}
            selectedRowKeys={this.state.selectedRowKeys}
            pagination={this.state.pagination}
            rowSelection = {{
              type:'checkbox',
            }}
          />
        </div>
        <Modal
          title='结束订单'
          visible={this.state.orderConfirmVisble}
          onCancel={()=>{
            this.setState({
              orderConfirmVisble:false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout='horizontal' {...formItemLayout}>
            <FormItem label='订单编号'>
               {this.state.selectedItem.order_sn}
            </FormItem>
            <FormItem label='行驶里程'>
              {this.state.selectedItem.distance/1000 + 'Km'}
            </FormItem>
            <FormItem label='用户名'>
              {this.state.selectedItem.user_name}
            </FormItem>
            <FormItem label='应付款'>
              {this.state.selectedItem.user_pay/10+ '元'}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
