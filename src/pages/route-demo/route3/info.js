import React, { Component } from 'react';

export default class Info extends Component{
  render(){
    return (
      <div>
        动态、动态、动态路由的值是：{this.props.match.params.value}
      </div>
    );
  }
}