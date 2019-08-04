import React, { Component } from 'react';
import { Card, Button, message, Tabs, Icon  } from 'antd';
import './ui.less';
const { TabPane } = Tabs;

export default class Tabs1 extends Component{
  newTabIndex = 0;
  callback = (key) => message.info('您选择了页签：' + key);
  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: activeKey, content: '欢迎使用本网站', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  componentWillMount(){
    const panes = [
      {
        title:'Tab 1',
        content:'欢迎使用本网站 Tab Pane 1',
        key:'1'
      },
      {
        title:'Tab 2',
        content:'欢迎使用本网站 Tab Pane 2',
        key:'2'
      },
      {
        title:'Tab 3',
        content:'欢迎使用本网站 Tab Pane 3',
        key:'3'
      },
    ]
    this.setState({
      activeKey: panes[0].key,
      panes
    })
  };

  render(){
    return(
      <div>
        <Card title='Tab页签' className='card-wrap'>
        {/* <Tabs defaultActiveKey="1" onChange={ (key) =>console.log('您选择了页签：' + key)}>  这个方法也好使，说明这个callback会接收tabpane中的key */}
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Tab 1" key="1">
            欢迎使用本网站 Tab Pane 1
          </TabPane>
           <TabPane tab="Tab 2" disabled={true} key="2">  {/*api中没有写不过我试了下可以再disabled后设置true或者false来控制是否禁用 */}
           Tab Pane 2 标签被禁用
          </TabPane>
          <TabPane tab="Tab 3" key="3">
          欢迎使用本网站 Tab Pane 3
          </TabPane>
        </Tabs>
        </Card>


        <Card title='有图标的标签' className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={
              <span>
                <Icon type="twitter" />
                Tab 1
              </span>
            } key="1">
              欢迎使用本网站 Tab Pane 1
            </TabPane>
            <TabPane tab={
              <span>
                <Icon type="amazon" />
                Tab 1
              </span>
            } key="2">
              欢迎使用本网站 Tab Pane 2
            </TabPane>
            <TabPane tab={
              <span>
                <Icon type="google-plus" />
                Tab 1
              </span>
            } key="3">
              欢迎使用本网站 Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        
        <Card title='可编辑标签' className='crad-wrap'>
            <Tabs 
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type='editable-card'
              onEdit={this.onEdit}
            >
              {
                this.state.panes.map((panel)=>
                  <TabPane 
                    tab={panel.title}
                    key={panel.key}
                  >
                    {panel.content}
                  </TabPane>
                )
              }
            </Tabs>
        </Card>

      </div>
    );
  }
}
