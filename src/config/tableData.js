const columns = [
  {
    title: 'id',
    dataIndex:'id',
    width:80
  },
  {
    title: '用户名',
    dataIndex:'userName',
    width:80
  },
  {
    title:'性别',
    dataIndex:'sex',
    width:80,
    render(sex){
      return sex ==1 ? '男':'女'
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    width:100,
    render(state){
      let config  = {
        '1':'咸鱼一条',
        '2':'风华浪子',
        '3':'北大才子',
        '4':'百度FE',
        '5':'创业者'
      }
      return config[state];
    }
  },
  {
    title: '爱好',
    dataIndex: 'interest',
    width:134,
    render(abc) {
      let config = {
          '1': '游泳',
          '2': '打篮球',
          '3': '踢足球',
          '4': '跑步',
          '5': '爬山',
          '6': '骑行',
          '7': '桌球',
          '8': '麦霸'
      }
      return config[abc];
  }
  },
  {
    title:'生日',
    dataIndex:'birthday',
    width:134
  },
  {
    title:'地址',
    dataIndex:'address',
    width:224
  },
  {
    title: '早起时间',
    dataIndex: 'time'
  }
]









export const columns2 = [
  {
      title: 'id',
      key: 'id',
      width: 80,
      fixed:'left',
      dataIndex: 'id'
  },
  {
      title: '用户名',
      key: 'userName',
      width: 80,
      fixed: 'left',
      dataIndex: 'userName'
  },
  {
      title: '性别',
      key: 'sex',
      width: 80,
      dataIndex: 'sex',
      render(sex) {
          return sex == 1 ? '男' : '女'
      }
  },
  {
      title: '状态',
      key: 'state',
      width: 80,
      dataIndex: 'state',
      render(state) {
          let config = {
              '1': '咸鱼一条',
              '2': '风华浪子',
              '3': '北大才子',
              '4': '百度FE',
              '5': '创业者'
          }
          return config[state];
      }
  },
  {
      title: '爱好',
      key: 'interest',
      width: 80,
      dataIndex: 'interest',
      render(abc) {
          let config = {
              '1': '游泳',
              '2': '打篮球',
              '3': '踢足球',
              '4': '跑步',
              '5': '爬山',
              '6': '骑行',
              '7': '桌球',
              '8': '麦霸'
          }
          return config[abc];
      }
  },
  {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  },
  {
      title: '左侧',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '固定',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '水平',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '滚动条',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  }, {
      title: '生日',
      key: 'birthday',
      width: 120,
      dataIndex: 'birthday'
  },
  {
      title: '地址',
      key: 'address',
      width: 120,
      dataIndex: 'address'
  },
  {
      title: '早起时间',
      key: 'time',
      width: 80,
      dataIndex: 'time'
  }
]


//初级表格的内容

export const baseTableData = [
  {
    id:'0',
    userName:'Jack',
    sex:'1',
    state:'1',
    interest:'1',
    birthday:'2000-01-01',
    address:'天津市天津之眼',
    time:'09:00'
  },
  {
      id: '1',
      userName: 'Tom',
      sex: '1',
      state: '1',
      interest: '1',
      birthday: '2000-01-01',
      address: '北京市海淀区奥林匹克公园',
      time: '09:00'
  },
  {
      id: '2',
      userName: 'Lily',
      sex: '1',
      state: '1',
      interest: '1',
      birthday: '2000-01-01',
      address: '杭州市西湖',
      time: '09:00'
  }
]

export default columns;