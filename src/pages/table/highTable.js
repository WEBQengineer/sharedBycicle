import React, { Component } from 'react';
import { Card, Table, Modal, Button, message, Badge, Input, Icon } from 'antd';
import axios from './../../axios/index';
import columns, { columns2 } from '../../config/tableData';
import {convertNumToChinese, Pagination } from '../../utils/utils';
import Highlighter from 'react-highlight-words';

export default class HighTable extends Component{
  state={
    searchText: ''
  }

  params={
    page:1
  }

  componentDidMount(){
    this.setState({
      columns2
    })
    this.request();
  }

//动态获取mock数据
  request = () =>{
    let _this = this;
    axios.ajax({
      url:'/table/high/list',
      data:{
        params:{
          page:this.params.page
        }
      }
    }).then((res)=>{
      res.result.list.map((item,index)=>{
        return item.key = index
      });
      this.setState({
        dataSource:res.result.list
      });
      // console.log(this.state.getColumnSearchProps('userName'));
    })
  }
  //排序
  handleChange = (pagination, filters, sorter)=>{
    console.log(sorter);
    this.setState({
      sortOrder:sorter.order
    })
  }

  //删除操作
  handleDelete = (item) => {
    let id = item.id;
    console.log(id);
    console.log(item);
    Modal.confirm({
      title:'确认',
      content:'您确认要删除此条数据吗？',
      onOk:()=>{
        message.success('删除成功');
        this.request();
      }
    })
  }
//筛选
getColumnSearchProps = dataIndex => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={node => {
          this.searchInput = node;
        }}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={() => this.handleSearch(selectedKeys, confirm)}
        icon="search"
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: filtered => (
    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: visible => {
    if (visible) {
      setTimeout(() => this.searchInput.select());
    }
  },
  render: text => (
    <Highlighter
      highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      searchWords={[this.state.searchText]}
      autoEscape
      textToHighlight={text.toString()}
    />
  ),
});

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  

  render(){

    const columns3 = [
      {
        title: 'id',
        dataIndex:'id',
        width:80
      },
      {
        title: '用户名',
        dataIndex:'userName',
        width:80
      },{
          title:'年龄',
          dataIndex:'age',
          width:85,
          sorter:(a,b)=>{
              return a.age - b.age
          },
          sortOrder:this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
        width:100,
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
        width:134,
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
        dataIndex:'birthday',
        key:'birthday',
        width:134,
        // sorter: (a, b) => {
        //   return a.birthday - b.birthday
        // },
        // sortOrder:this.state.sortOrder
      },
      {
        title:'地址',
        dataIndex:'address',
        width:224,
        // sorter: (a, b) => {
        //   return a.address.length - b.address.length
        // },
        // sortOrder:this.state.sortOrder        
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]

    const columns4 = [
      {
        title: 'id',
        dataIndex:'id',
        width:80,
        ...this.getColumnSearchProps('id')
      },
      {
        title: '用户名',
        dataIndex:'userName',
        width:80,
        // ...this.getColumnSearchProps('userName')
      },{
          title:'年龄',
          dataIndex:'age',
          width:85
      },
      {
        title: '状态',
        dataIndex: 'state',
        width:100,
        render(state){  //这里因为只是返回值，不涉及this，所以正常写render方法,不需要加this
          let config  = {
            '1':<Badge status='success' text='成功' />,
            '2':<Badge status='error' text='报错'/>,
            '3':<Badge status='default' text='正常'/>,
            '4':<Badge status='processing' text='进行中'/>,
            '5':<Badge status='warning' text='警告'/>
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width:134,
        render(abc) {
          let config = {
              '1': "游泳",
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
        dataIndex:'birthday',
        width:134
      },
      {
        title:'地址',
        dataIndex:'address',
        width:224
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      },{
        title:'操作',
        render:(text,item)=>{   //这边因为涉及到this问题，所以最好用箭头函数，也就是render后加一个冒号:
          return <Button size='small' onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
        }
      }
    ]
  
  
  

    return(
      <div>
        <Card title='头部固定'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{y:240}}
          />
        </Card>

        <Card title='左侧固定' style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns2}
            dataSource={this.state.dataSource}
            pagination={false}
            scroll={{x:2650,y:350}}
          />
        </Card>

        <Card title='表格排序' style={{margin: '10px 0'}}>
          <Table
            bordered
            columns={columns3}
            dataSource={this.state.dataSource}
            pagination={false}
            onChange= {this.handleChange}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          />
        </Card>

        <Card title='操作按钮'>
          <Table 
            bordered
            columns={columns4}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}