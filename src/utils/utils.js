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

  // return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'  '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  return date.getFullYear()+'-'+(getMonth1())+'-'+(getDate())+'  '+(getHours())+':'+(getMinutes())+':'+(getSeconds());
}

