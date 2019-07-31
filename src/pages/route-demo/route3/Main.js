import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component{
  render(){
    return (
      <div>
        this is Main page2
        <br/>
        <Link to='/main/first'>嵌套路由1</Link>
        <br/>
        <Link to='/main/second'>嵌套路由2</Link>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}