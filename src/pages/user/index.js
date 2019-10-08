import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select, message } from 'antd';
import ETable from '../../components/ETable/index';
import BaseForm from '../../components/BaseForm';
import axios from './../../axios/index';
import Util from '../../utils/utils';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends Component{

    state={
        // pagination:{}
    }

    params = {
        page:1
    }

    componentDidMount(){
        this.requestList();
    }

    formList = [
        {
            type:'INPUT',
            label:'员工名',
            field:'user_name',
            placeholder:'请输入员工名称',
            width:90
        },{
            type:'INPUT',
            label:'手机号',
            field:'user_mobile',
            placeholder:'请输入手机号',
            width:90
        },{
            type:'DATE',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请输入日期'
        }
    ]

    handleFilter= (params) => {
        message.success(`查询的用户名为${params.user_name},查询的手机号为${params.user_mobile},查询的日期为${Util.getCurrentDate(params.user_date) }`)
        this.params = params;
        console.log('this',this);
        console.log('params',params);
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this,'/user/list',this.params,true)
    }
    /**
     *功能区操作
     * 参数type是为了复用代码做的区分，比如handleSubmit方法根据type的不同来决定请求哪个接口，还有控制modal的页脚是否显示
     * @memberof User
     */
    handleOperate  = (type) => {
        let _this = this;
        let item = this.state.selectedItem;
        if(type == 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        }else if(type == 'edit'){
            if (!item) {
                Modal.info({
                    title:'提示',
                    content:'请选择一个员工'
                });
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'编辑员工',
                userInfo:item
            })
        }else if(type == 'detail'){
            if (!item) {
                Modal.info({
                    title:'提示',
                    content:'请选择一个员工'
                });
                return;
            }
            this.setState({
                type,
                isVisible:true,
                title:'员工详情',
                userInfo:item
            })

        }else if(type == 'delete') {
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                });
                return;
            }
            Modal.confirm({
                title:'确认删除',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            },
                            isMock:true
                        }
                    }).then((res)=>{
                        if(res.code == 0){
                            _this.setState({
                                isVisible:false
                            });
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url:type=='create'?'/user/add':'/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code == 0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible:false
                });
                this.requestList();
            }
        })
    }

    render(){
        const columns = [
            {
                title:'id',
                dataIndex:'id'
            },{
                title: '员工名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex == 1?'男':'女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    return {
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子一枚',
                        '4':'百度FE',
                        '5':'创业者'
                    }[state]
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    return {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6':'骑行',
                        '7':'桌球',
                        '8':'麦霸'
                    }[interest]
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            },
        ]

        let footer1 = {};
        if(this.state.type == 'detail'){
            footer1 = {
                footer1:null
            }
        }
//上面的footer1是资料里的，下面这个是我写的，感觉我写的这个更加的清晰易懂
        let footer;
        if(this.state.type == 'detail'){
            footer=null
        }

        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                
                <Card style={{marginTop:10}} className='operate-wrap'>
                    <Button type='primary' icon='plus' onClick={()=>this.handleOperate('create')} >创建员工</Button>
                    <Button type='primary' icon='edit' onClick={()=>this.handleOperate('edit')} >编辑员工</Button>
                    <Button type='primary'  onClick={()=>this.handleOperate('detail')} >员工详情</Button>
                    <Button type='primary' icon='delete' onClick={()=>this.handleOperate('delete')} >删除员工</Button>
                </Card>
                <div className='content-wrap'>
                <ETable
                    updateSelectedItem={Util.updateSelectedItem.bind(this)}
                    columns={columns}
                    dataSource={this.state.list}
                    selectedRowKeys={this.state.selectedRowKeys}
                    pagination={this.state.pagination}
                    rowSelection = {{
                        type:'radio'
                    }}
                />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    //在点击oncancel时，将存在state中的form清空
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false,
                            userInfo:{},
                            type:''
                        })
                    }}
                    // {...footer}
                    footer={footer}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst)=>this.userForm = inst} />
                </Modal>
            </div>
        );
    }
}

class UserForm extends Component{

    getState = (state) => {
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }

    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{span:7},
            wrapperCol:{span:13}
        }
        return(
            <Form laylout='horizontal'>
                <FormItem label='用户名' {...formItemLayout}>
                    {
                        type == 'detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username
                        })(
                            <Input placeholder='请输入员工姓名' type='text'/>
                        )
                    }
                </FormItem>
                <FormItem label='性别' {...formItemLayout}>
                    {
                        type == 'detail'?userInfo.sex==1?'男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label='状态' {...formItemLayout}>
                    {
                        type == 'detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue:userInfo.username
                        })(
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='生日' {...formItemLayout}>
                    {
                        type == 'detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:moment(userInfo.birthday)
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label='联系地址' {...formItemLayout}>
                    {
                        type == 'detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                            <TextArea rows={3} placeholder='请输入联系地址'></TextArea>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

UserForm = Form.create()(UserForm)