import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends Component{
  render(){
    return (
      <div>
        <ul>
          <li>
            <Link to='/main'>Main</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/topics'>Topics</Link>
          </li>
        </ul>
        {this.props.children}
      </div>     
    );
  }
}