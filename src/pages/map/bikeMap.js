import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
import ETable from '../../components/ETable/index';
import BaseForm from '../../components/BaseForm';
import axios from './../../axios/index';
import Util from '../../utils/utils';

export default class BikeMap extends Component{

    state={}

    componentWillMount(){
        this.requestList();
    }
    formList = [
        {
            type:'城市',
            label:'城市',
            field:'city',
            placeholder:'全部',
            width:80,
            initialValue:'0',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '上海' }, { id: '1', name: '天津' }, { id: '2', name: '杭州' }]
        },{
            type:'时间查询'
        },{
            type:'SELECT',
            label:'订单状态',
            field:'order_status',
            placeholder:'全部',
            width:90,
            initialValue:'0',
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '行程结束' }]
        }
    ]

    requestList = () => {
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if (res.code == 0) {
                this.setState({
                    total_count:res.result.total_count
                })
                this.renderMap(res);
            }
        })
    }
    //查询表单
    handleFilterSubmit = (filterParams)=>{
        this.params = filterParams;
        this.requestList();
    }

    //渲染地图数据
    renderMap = (res) => {
        //初始化起点终点
        let list = res.result.route_list;
        this.map = new window.BMap.Map('container');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0],gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0],gps2[1]);
        this.map.centerAndZoom(endPoint,11);
        //起点icon
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,42)
        });
        let BikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(BikeMarkerStart);
        //终点icon
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18,41)//anchor通俗的讲就是要指定图片的哪个位置是与标注真正的位置对应在一起。
        });
        let BikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(BikeMarkerEnd);

        //绘制行车路线
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]))
        });
        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        });
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];
        res.result.service_list.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        });
        
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor:'#ef4136',
            strokeWeight:3,
            strokeOpacity:1
        });
        this.map.addOverlay(polyServiceLine)

        //添加地图中自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor:new window.BMap.Size(18,42)
        });
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let bikePoint = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(bikePoint,{ icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        });
        

    }

    render(){
        return(
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}>

                    </div>
                </Card>
            </div>
        );
    }
}