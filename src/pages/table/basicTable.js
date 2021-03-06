import React, { Component } from 'react';
import { Table, Card, Modal, message, Button } from 'antd';
import axios from './../../axios/index';
import columns, { baseTableData } from '../../config/tableData';
import Util from '../../utils/utils';

export default class BasicTable extends Component{
  state={
    dataSource2: [],
    columns
  }

  params={
    page:1
  }
  
  //单选框的点击事件
  onRowClick = (record, index) => {  //record指当前选中的行数据
    let selecKey = [index];
    this.setState({
      selectedRowKeys: selecKey,
      selectedItem:record
    });
    Modal.info({
      title:'信息',
      content:`用户名: ${record.userName}, 用户爱好:${Util.convertNumToChinese(record.interest)}` //这个使用来将爱好字典中的数字（1，2……）转化为中文
    })
  }
  //复选框的点击事件
  onRowCheckboxClick = (record, index) => {  //record指当前选中的行数据
    try {
      message.info(
        `用户名: ${record.userName}, 用户爱好:${Util.convertNumToChinese(record.interest)}`, //这个使用来将爱好字典中的数字（1，2……）转化为中文
        0.5
      )
    } catch (error) {
      message.info('取消选择',0.5)
    }
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
        content:`您没有选中数据项`
      })
    };
    
    let bk2 = '\xa0\xa0';
    if(rows){
      Modal.confirm({
        title:'删除提示',
        content:`您要删除这些数据吗？${bk2}${ids.join(",\xa0\xa0")}${bk2}号`,
        onOk:()=>{
          message.success('删除成功');
          this.request();//删除操作后再次进行刷新
        }
      })
    }
    
  }

  componentDidMount(){
    const dataSource = baseTableData;
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
    let _this = this;
    axios.ajax({
      url:'/table/list',
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
        dataSource2:res.result.list,
        selectedRowKeys2:[],
        selectedRows:null,
        pagination: Util.pagination(res,(current)=>{
          _this.params.page = current;
          this.request();
          console.log(current);
          console.log(res);
        })
      });
    })
  }

  render(){
    const columns = this.state.columns;
    const { selectedRowKeys } = this.state;   //	指定选中项的 key 数组
    const rowSelection = {
      type:'radio',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        },()=>{
          this.onRowClick(selectedRows[0], selectedRowKeys[0]);
        });
      }
    }
    //table加复选框
    const { selectedRowKeys2 } = this.state;
    const rowCheckSelection = {
      type:'checkbox',
      selectedRowKeys:selectedRowKeys2,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys2:selectedRowKeys,
          selectedRows
        },()=>{
          console.log(this.state.selectedRowKeys2);
        });
      }
      // onRow 有时间用这个实现点击弹框提示功能
    }
    //分页功能
    const { selectedRowKeys3 } = this.state;
    const rowCheckSelection3 = {
      type:'checkbox',
      selectedRowKeys:selectedRowKeys3,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys3:selectedRowKeys,
          selectedRows
        },()=>{
          console.log(this.state.selectedRowKeys3);
        });
      }
      // onRow 有时间用这个实现点击弹框提示功能
    }

    return (
      <div>
        <Card title='基础表格'>
          <Table
            bordered
            columns={columns}
            pagination={false}
            dataSource={this.state.dataSource}
          />
        </Card>

        <Card title='easy mock动态数据渲染表格' style={{margin:'10px 0'}}>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        {/* 这里强调下用onrow控制点击行事件，用onchange控制点击按钮事件 */}
        <Card title='easy-mock 表格增加单选按钮' style={{margin:'10px 0'}}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowSelection}  //表格行是否可选择
            pagination={false}
            onRow={(record, index) => {  //设置行属性
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                } // 点击行
              };
            }}
          />
        </Card> 
        
        <Card title='easy-mock 表格增加复选按钮'>
          <div>
              <Button type='primary' onClick={this.handleDelete} style={{margin:'10px 0'}}>删除</Button>
          </div>
            <Table
              bordered
              rowSelection={rowCheckSelection}
              columns={columns}
              dataSource={this.state.dataSource2}
              pagination={false}
            />
        </Card>

        <Card title='easy-mock 增加分页' style={{margin:'10px 0'}}>
          <Table
            columns={columns}
            bordered
            rowSelection={rowCheckSelection3}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}