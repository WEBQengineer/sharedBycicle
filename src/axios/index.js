// import JsonP from 'jsonp';

// export default class Axios{
//   static jsonp(options){
//     return new Promise((resolve,reject)=>{
//       JsonP(options.url,{
//         param: 'callback'
//       },function(err,response){
//         if(response.status=='success'){
//           resolve(response);
//         }else{
//           reject(response.message);
//         }
//       })
//     })
//   }  
// }

import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios{
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
    if(options.data && options.data.isShowLoading !== false){
      loading = document.getElementById('ajaxLoading');
      loading.style.display = 'block';
    }
    let baseApi = 'https://www.easy-mock.com/mock/5d4d2be7fd8d1b1fc7eab664/mockapi';
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