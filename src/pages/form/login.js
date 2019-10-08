import React, { Component } from 'react';
import { Card, Form, Button, Input, Icon, Checkbox, message } from 'antd';
import './ui.less';
const FormItem = Form.Item;

class FormLogin extends Component{

  handleSubmit = () =>{
    let userInfo = this.props.form.getFieldsValue();//获取值
    this.props.form.validateFields((err,values)=>{//校验值
      if(!err){
        message.success(`${userInfo.userName} 恭喜你，通过本次表单验证 密码是${userInfo.passWord}`)
      }
    })
  }
  render(){
    //经过 Form.create 包装的组件将会自带 this.props.form 属性
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Card title='登陆行内表单'>
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名'/>
            </FormItem>
            <FormItem>
              <Input type='password' placeholder='请输入密码'/>
            </FormItem>
            <FormItem>
              <Button type='primary'>登陆</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title='登陆水平表单'>
          <Form style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('userName',{   //用于和表单进行双向绑定
                  rules:[
                    {
                      required:true,
                      message: '请输入用户名'
                    },{
                      min:5,
                      max:10,
                      message: '用户名长度不在范围内'
                    },{
                      // pattern:/^\w+$/g,
                      pattern:new RegExp('^\\w+$','g'),
                      message:'用户名必须为字母或者数字'
                    }
                  ]
                })(<Input prefix={<Icon type='user'/> } placeholder='请输入用户名'/>)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('passWord',{
                  rules:[
                    {
                      required:true,
                      message:'请输入密码'
                    }
                  ]
                })(
                  <Input prefix={<Icon type='lock'/>} type='password' placeholder='请输入密码'/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('checkBox',{
                  // rules:[],
                  valuePropName:'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href='#/admin/home' style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type='primary' onClick={this.handleSubmit}>登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(FormLogin);