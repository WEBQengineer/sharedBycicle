import JsonP from 'jsonp';
import axios from 'axios';
import Util from '../utils/utils';
import { Modal } from 'antd';

export default class Axios{
  //table请求封装，第四个ismock如果是true说明是用的mock数据
  static requestList(_this,url,params,isMock){
    var data = {
      params: params,
      isMock
    }
    this.ajax({
      url,
      data
    }).then((data)=>{
      if(data && data.result){
        let list = data.result.item_list.map((item,index)=>{
          item.key = index;
          return item
        })
        _this.setState({
          list,
          pagination: Util.pagination(data, (current)=>{
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }




  static jsonp(options){
    return new Promise((resolve,reject)=>{
      JsonP(options.url,{
        param: 'callback'
      },function(err,response){
        if(response){
          if(response.status=='success'){
            resolve(response);
          }
        }else{
          reject();
        }
      })
    })
  }


  static ajax(options){
    let loading;
    if(options.data && options.data.isShowLoading !== false){  //isShowLoading是需要我们设置的一个属性，类似axios中的url
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = '';
    if(options.data.isMock){
      baseApi = 'https://www.easy-mock.com/mock/5d4d2be7fd8d1b1fc7eab664/mockapi';
    }else{
      baseApi = 'https://www.easy-mock.com/mock/5d4d2be7fd8d1b1fc7eab664/mockapi';
    }
    
    return new Promise((resolve,reject)=>{
      axios({
        url:options.url,
        method:'get',
        baseURL:baseApi,
        timeout:5000,
        params: (options.data && options.data.params) || ''  //这个没弄明白是做什么用的
      }).then((response) => {   //这个then不是Promise的.then而是axios的.then方法
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
            loading.style.display = 'none';
          } else {
            Modal.info({
              title:'提示',
              content:res.msg
            })
            // const modal = Modal.info();
            // modal.update({
            //   title: '修改的标题',
            //   content: '修改的内容',
            // });
          }
        } else {
          reject(response.data)
        }
      })
    })
  }
}