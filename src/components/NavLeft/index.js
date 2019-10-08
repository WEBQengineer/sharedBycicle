import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MenuConfig from './../../config/menuConfig';
import './index.less';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

export default class NavLeft extends Component{
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    })
  }
  //菜单渲染
  renderMenu = (data)=>{
    return data.map((Item) => {
      if(Item.children){
          return (
            <SubMenu title={Item.title} key={Item.key}>
              {this.renderMenu(Item.children)}
            </SubMenu>
          )      
      }
      return <Menu.Item key={Item.key}>
        <NavLink to={Item.key}>
          {Item.title}
        </NavLink>
      </Menu.Item>
    })
  }
  
  render(){
    return(
      <div>
        <div className='logo'>
          <img src='/assets/logo-ant3.svg' alt=''/>
          {/* <h1>Shared bicycle</h1> */}
        </div>
        <Menu theme='dark'>
          { this.state.menuTreeNode }
        </Menu>
      </div>
    );
  }
}