import React, { Component } from 'react';
import { Table, Card, Modal, Checkbox, message } from 'antd';
import axios from './../../axios/index';
import { Button } from 'antd/lib/radio';

export default class BasicTable extends Component{
  state={
    dataSource2: []
  }
  convertNumToChinese = (num1) => {
    switch (num1) {
      case 1:
        return '游泳'
      case 2:
        return '打篮球'
      case 3:
        return '踢足球'
      case 4:
        return '跑步'
      case 5:
        return '爬山'
      case 6:
        return '骑行'
      case 7:
        return '桌球'
      case 8:
        return '麦霸'
      default:
        return '待定'
    }
  }

  onRowClick = (record, index) => {  //record指当前选中的行数据
    let selecKey = [index];
    this.setState({
      selectedRowKeys: selecKey,
      selectedItem:record
    });
    Modal.info({
      title:'信息',
      // content:`用户名: ${record.userName}, 用户爱好:${record.interest}`
      content:`用户名: ${record.userName}, 用户爱好:${this.convertNumToChinese(record.interest)}` //这个使用来将爱好字典中的数字（1，2……）转化为中文
    })
  }
  //多选执行删除
  handleDelete = () =>{
    let rows = this.state.selectedRows;
    let ids = [];
    try {
      //没有数据时，捕获异常
      rows.map((item)=>{
        ids.push(item.id)
      });
    } catch (error) {
      Modal.confirm({
        title:'删除提示',
        content:`您没有选中数据项`,
        onOk:()=>{
          message.success('返回选择')
        }
      })
    };
    
    let bk2 = '\xa0\xa0';
    let a1 = ' ';
    let Obj1 = document.createElement('span');
    Obj1.innerHTML = '登录';
    if(rows){
      Modal.confirm({
        title:'删除提示',
        content:`您要删除${Obj1}${Obj1}${Obj1}这些数据吗？${bk2}${ids.join(",\xa0\xa0")}${bk2}号`,
        onOk:()=>{
          message.success('删除成功')
        }
      })
    }
    
  }

  componentDidMount(){
    const dataSource = [
      {
        id:'0',
        userName:'Jack',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'2000-01-01',
        address:'北京市海淀区奥林匹克公园',
        time:'09:00'
      },
      {
          id: '1',
          userName: 'Tom',
          sex: '1',
          state: '1',
          interest: '1',
          birthday: '2000-01-01',
          address: '北京市海淀区奥林匹克公园',
          time: '09:00'
      },
      {
          id: '2',
          userName: 'Lily',
          sex: '1',
          state: '1',
          interest: '1',
          birthday: '2000-01-01',
          address: '北京市海淀区奥林匹克公园',
          time: '09:00'
      }
    ]
    dataSource.map((item,index)=>{
      return item.key = index;
    });
    // console.log(dataSource);//这里打印出了已经添加key的item
    this.setState({
      dataSource
    });
    this.request();
  }


  //动态获取mock数据
  request = () =>{
    // axios.get('/table/list').then((res)=>{
    //   console.log(JSON.stringify(res));
    //   this.setState({
    //     dataSource2:res.data.result
    //   })
    // })
    axios.ajax({
      url:'/table/list',
      data:{
        page:1
      }
    }).then((res)=>{
      res.result.map((item,index)=>{
        return item.key = index
      })
      this.setState({
        dataSource2:res.result
      })
    },()=>{
      alert('请求数据失败')
    })
  //上面是我写的，因为在axios中已经判断过code==0，所以我觉得在basicTable中不需要加上这段代码了，经测试代码正常运行
  // }).then((res)=>{
  //   if(res.code == 0){
  //     this.setState({
  //       dataSource2:res.result
  //     })
  //   }
  // })
  }


  render(){
    //习惯性把columns放在return前面，render函数里
    const columns = [
      {
        title: 'id',
        dataIndex:'id'
      },
      {
        title: '用户名',
        dataIndex:'userName'
      },
      {
        title:'性别',
        dataIndex:'sex',
        render(sex){
          return sex ==1 ? '男':'女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state){
          let config  = {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子',
            '4':'百度FE',
            '5':'创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(abc) {
          let config = {
              '1': '游泳',
              '2': '打篮球',
              '3': '踢足球',
              '4': '跑步',
              '5': '爬山',
              '6': '骑行',
              '7': '桌球',
              '8': '麦霸'
          }
          return config[abc];
      }
      },
      {
        title:'生日',
        dataIndex:'birthday'
      },
      {
        title:'地址',
        dataIndex:'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    const { selectedRowKeys } = this.state;   //	指定选中项的 key 数组
    const rowSelection = {
      type:'radio',
      selectedRowKeys
    }
    const rowCheckSelection = {
      type:'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }
    return (
      <div>
        <Card title='基础表格'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            // pagination={false}
          />
        </Card>

        <Card title='easy mock动态数据渲染表格' style={{margin:'10px 0'}}>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>

        <Card title='easy-mock 表格增加单选按钮'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowSelection}  //表格行是否可选择
            onRow={(record, index) => {  //设置行属性
              return {
                onClick: () => {
                  this.onRowClick(record, index);//record:选中的行的数据，index:选中了哪行
                } // 点击行
              };
            }}
          />
        </Card>

        
        <Card title='easy-mock 表格增加复选按钮'>
          <div>
              <Button onClick={this.handleDelete} style={{margin:5}}>删除</Button>
          </div>
            <Table
              bordered
              rowSelection={rowCheckSelection}
              columns={columns}
              dataSource={this.state.dataSource2}
            />
        </Card>
      </div>
    );
  }

}