import React, { Component } from 'react';
import { Table, Card } from 'antd';

export default class ETable extends Component{
  //行点击事件
  
  onRowClick = (record, index)=>{
    let rowSelection = this.props.rowSelection;
    if(rowSelection.type == 'checkbox'){
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem;
      let selectedIds = this.props.selectedIds;
      // console.log(record.id,'+++',index);
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
        if(i == -1){
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        }else{
          selectedIds.splice(i,1);
          console.log('index的值',index);
          console.log(selectedRowKeys);
          // console.log('类型',typeof(selectedRowKeys));
          for(let i=0;i<selectedRowKeys.length;i++){
            if(selectedRowKeys[i] == index){
              console.log('for循环内index的值',index);
              console.log('selectedRowKeys的值：'+selectedRowKeys[i]);
              console.log('删除第:',(selectedRowKeys[i]+1)+'个');
              selectedRowKeys.splice(i,1);
              break;
            }
          }
          console.log(selectedRowKeys);
          selectedItem.splice(record)
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record]
      }
      this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    }else if(rowSelection.type == 'radio'){
      let selectedRowKeys = [index];
      let selectedItem = record;
      this.props.updateSelectedItem(selectedRowKeys, selectedItem);
    }else{
      return
    }
  }

  //table封装
  //rowSelection如传checkbox就是复选框，如传radio就是单选框，如果不传就是都没有
  tableInit = () =>{
    let row_selection = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type:'radio',
      selectedRowKeys,
      onChange:this.onSelectChange
    }
    if (!row_selection){
        row_selection = false;
    } else if (row_selection.type == 'checkbox'){
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
              // if (!row_selection) {
              //   return
              // }
              this.onRowClick(record, index);
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