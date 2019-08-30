import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
//再次升级版
  getCurrentDate(){
    let date = new Date();
    //得到月份
    function getMonth1(){
      if((date.getMonth()+1)<10){
        return "0" +""+ (date.getMonth()+1);
      }else{
        return (date.getMonth()+1)
      }
    }
    //得到日
    function getDate(){
      if((date.getDate()+1)<10){
        return "0" +""+ (date.getDate()+1);
      }else{
        return (date.getDate()+1)
      }
    }
    //得到小时
    function getHours(){
      if((date.getHours()+1)<10){
        return "0" +""+ (date.getHours()+1);
      }else{
        return (date.getHours()+1)
      }
    } 
    //得到分钟
    function getMinutes(){
      if((date.getMinutes()+1)<10){
        return "0" +""+ (date.getMinutes()+1);
      }else{
        return (date.getMinutes()+1)
      }
    } 

    //得到秒
    function getSeconds(){
      if((date.getSeconds()+1)<10){
        return "0" +""+ (date.getSeconds()+1);
      }else{
        return (date.getSeconds()+1)
      }
    } 
    return date.getFullYear()+'-'+(getMonth1())+'-'+(getDate())+'  '+(getHours())+':'+(getMinutes())+':'+(getSeconds());
  },

  //数字转汉字
  convertNumToChinese(num){
      switch (num) {
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
  },

  //分页
  pagination(data,callback){
    return {
        onChange:(current)=>{
            callback(current)
        },
        current:data.result.page,
        pageSize:data.result.page_size,
        total: data.result.total_count,
        showTotal:()=>{
            return `共${data.result.total_count}条`
        },
        showQuickJumper:true
    }
  },

  getOptionList(data){
    if(!data){
      return [];
    }
    let options = [];
    data.map((item)=>{
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
  },

  /**
   *保存选中行数据到state
   *
   * @param {*} selectedRowKeys
   * @param {*} selectedItem
   */
  updateSelectedItem(selectedRowKeys){

      this.setState({
        selectedRowKeys,
      });
  }
}