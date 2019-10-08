import React, { Component } from 'react';
import { Card, Button, Form, Modal, message } from 'antd';
import BaseForm from '../../components/BaseForm/index';
import ETable from '../../components/ETable/index';
import axios from '../../axios/index';
import Util from '../../utils/utils';
const FormItem = Form.Item;

export default class Order extends Component{
  state = {
    orderConfirmVisble:false,
    orderInfo:{},
    selectedItem:{},
    // selectedRowKeys:[0]
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
      console.log('我是数组',item)
      // if (!item) {  //因为下面还要展示出selectedItem的数据所以，必须先在state中声明一个空的selectedItem
      //以此if (!item)这种判断方法不能生效
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

  //结束订单onOk事件
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
  //打开订单详情
  openOrderDetail = () => {
      let item = this.state.selectedItem;
      if(Object.keys(item).length == 0){ //ES6的新方法, 返回值是对象中属性名组成的数组
        Modal.info({
          title: '信息',
          content: '您还未选择订单'
        });
        return;
      }
      window.open(`/#/common/order/detail/${item.id}`,'_blank')
  }

  
  render(){
    let __this = this;
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
          //通过下面的方法获得了selectedRowKeys的默认值并使默认值生效，详情可看上面selectedItem1
          render(text, record, index){
            console.log('又执行一次');
            let abc = __this.state.selectedRowKeys;
            if(abc == index){
              __this.selectedItem1=record;
              // console.log('这里的this.selectedItem1',__this.selectedItem1)
            };         
            return text ==1 ? '行程结束':'进行中'
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
        <div className='content-wrap'>
          <ETable
            updateSelectedItem={Util.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            selectedItemClear={this.state.selectedItem1}
            selectedRowKeys={this.state.selectedRowKeys}
            pagination={this.state.pagination}
            rowSelection = {{
              type:'radio'
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
