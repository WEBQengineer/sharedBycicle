import React, { Component } from 'react';
import { Card, Form, Button, Input, Icon, Checkbox } from 'antd';
import './ui.less';
const FormItem = Form.Item;

class FormLogin extends Component{

  handleSubmit = () =>{
    this.props.form.getFieldsValue();
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <Card title='登陆行内表单'>
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名'></Input>
            </FormItem>
            <FormItem>
              <Input placeholder='请输入密码'></Input>
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>


        <Card title='登陆水平表单'>
          <Form style={{width:300}}>
            <FormItem>
              {
                getFieldDecorator('userName',{
                  initialValue: '',
                  rules:[
                    {
                      required:true,
                      message:'用户名不能为空'
                    },
                    {
                      min:5,
                      max:10,
                      message:'用户名长度不再范围内'
                    },
                    {
                      // pattern:/^\w+$/g,
                      pattern:new RegExp('^\\w+$','g'),
                      message:'用户名必须为数字或者英文字母'
                    }
                  ]
                })(
                  <Input prefix={ <Icon type='user'/> } placeholder='请输入用户名' />
                )
              }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('userPwd',{
                    initialValue: '',
                    rules:[]
                  })(
                    <Input type='password' prefix={ <Icon type='lock'/> } placeholder='请输入密码' />
                  )
                }
              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('remember',{
                    valuePropName:'checked',//需要声明这一行才能用
                    initialValue: true
                  })(
                    <Checkbox>记住密码</Checkbox>
                  )
                }
                <a href='#' style={{float:'right'}}>忘记密码</a>
              </FormItem>
              <FormItem>
                <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(FormLogin);