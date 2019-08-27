import React, { Component } from 'react';
import { Table, Card } from 'antd';

export default class ETable extends Component{
  state= {
    selectedRowKeys:[]
  }
  //行点击事件  
  onRowClick = (record, index)=>{
    console.log('456')
    let rowSelection = this.props.rowSelection;
    if(rowSelection.type == 'checkbox'){
      let selectedRowKeys = this.props.selectedRowKeys;
      let selectedItem = this.props.selectedItem;
      let selectedIds = this.props.selectedIds;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
        if(i == -1){
          selectedIds.push(record.id);
          let abc = this.state.selectedRowKeys;
          console.log('abc是：'+abc);
          abc.push(index);
          this.setState({
            selectedRowKeys:abc
          })
          selectedItem.push(record);
        }else{
          console.log('else');
          selectedIds.splice(i,1);
          for(let i=0;i<selectedRowKeys.length;i++){
            if(selectedRowKeys[i] == index){
              selectedRowKeys.splice(i,1);
            }
          }
          selectedItem.splice(record)
        }
      } else {
        console.log('还有一个');
        let def = this.state.selectedRowKeys;
          console.log('def是：'+def);
          def.push(index);
          this.setState({
            selectedRowKeys:def
        })
        selectedIds = [record.id];
        // selectedRowKeys = [index];
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
      selectedRowKeys:this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys:selectedRowKeys,
          selectedRows
        },()=>{
          console.log('选中项有',this.state.selectedRowKeys)
      });
      }
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
              console.log(rowSelection.selectedRowKeys)
              if (!row_selection) {
                return;
              }
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