import React, { Component } from 'react';
import { Table } from 'antd';

export default class ETable extends Component{
  state= {
    selectedRowKeys:[]
  }

  componentDidMount(){
    let stateSelectRow = this.state.selectedRowKeys;
    let selectedRowKeys = this.props.selectedRowKeys || [];
    selectedRowKeys = selectedRowKeys.concat(stateSelectRow);
    console.log('之前就已经有的',selectedRowKeys);
    selectedRowKeys = Array.from(new Set(selectedRowKeys));
    this.setState({
      selectedRowKeys
    })
  }

  //行点击事件  
  onRowClick = (record, index,rowSelection)=>{
    let selectedRowKeys = this.state.selectedRowKeys;
    if(rowSelection.type == 'checkbox'){
      //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
          let i = selectedRowKeys.indexOf(index);
          if(i!=-1 ){
            selectedRowKeys.splice(i,1);
            selectedRowKeys = Array.from(new Set(selectedRowKeys));//数组去重
            // console.log('还剩下',selectedRowKeys);
            this.setState({
              selectedRowKeys
            });
            console.log('没进');
          }else{
            console.log('进else')
            selectedRowKeys.push(index);
            selectedRowKeys = Array.from(new Set(selectedRowKeys));
            //console.log('点击行后selectedRowKeys是：'+selectedRowKeys);
            this.setState({
              selectedRowKeys:selectedRowKeys
            });
            // console.log('当前点击的行是：'+index,'选中的是',selectedRowKeys);
          };
          this.props.updateSelectedItem(record);
        // }
      }else{
        this.setState({
          selectedRowKeys:[index]
        },()=>{
          console.log('我是selectedrowkeys',selectedRowKeys);
          this.props.updateSelectedItem(record);
        });
      }
  }

  //table封装
  //rowSelection如传checkbox就是复选框，如传radio就是单选框，如果不传就是都没有
  tableInit = () =>{
    let row_selection = this.props.rowSelection;
    const rowSelection = {
      type:'radio',
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    }
    if (row_selection.type == 'checkbox'){
        rowSelection.type = 'checkbox';
    } else {
        rowSelection.type = 'radio';
    }
    return <Table
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection:null}
        onRow={(record, index)=>{
          return {
            onClick: ()=>{
              this.onRowClick(record, index,rowSelection);
            }
          }
        }}
    />
  }
  render(){
    return(
      <div>
        {this.tableInit()}
      </div>
    );
  }
}