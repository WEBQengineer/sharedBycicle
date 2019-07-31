// export default {
//   formateDate(time){
//     if(!time)return '';
//     let date = new Date(time);
//     return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//   }
// }


//自己写的改进版
// export default {
//   formateDate(){
//     let b = new Date().getTime();
//     if(!b)return '';
//     let date = new Date(b);
//     return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//   }
// }

//再次升级版
export function getCurrentDate(){
  // let b = new Date().getTime();                                                                                                                                //getTime()	返回 1970 年 1 月 1 日至今的毫秒数。 创建 Date 对象的语法：var myDate=new Date()
  // if(!b)return '';
  let date = new Date();
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}

