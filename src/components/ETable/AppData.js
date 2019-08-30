import React from 'react'
const Breadcrumb = [
  {
    id: '1',
    href: '',
    name: '1'
  },
  {
    id: '2',
    href: '',
    name: '2'
  }
]

const formList = [
  {
    type: 'INPUT',
    label: '关键词：',
    field: 'key',
    placeholder: '请输入关键词',
    initialValue: '',
    width: 60
  },
  {
    type: 'SELECT',
    label: '状态',
    field: 'order_status',
    placeholder: '全部',
    initialValue: '全部',
    width: 100,
    list: [
      {
        id: 0,
        name: '已上线'
      },
      {
        id: 1,
        name: '已下线'
      },
      {
        id: 2,
        name: '待审核'
      }
    ]
  }
]

const table = {
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
      sorter: true
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: true
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: true
    },
    {
      title: 'action',
      dataIndex: 'action',
      sorter: true
    }
  ],
  data: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park'
    }
  ],
  Pagination:{
    defaultCurrent:1,
    pageSize:2
  }
}

export default {
  formList,
  Breadcrumb,
  table
}

