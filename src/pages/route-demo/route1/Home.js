import React, { Component } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Main from './Main';
import About from './About';
import Topic from './Topic';

export default class Home extends Component{
  render() {
    return(
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to='/'>Main</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/topics'>Topics</Link>
            </li>
          </ul>

          <hr/>
          <Route path='/' exact={true} component={Main}></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/topics' component={Topic}></Route>
        </div>
      </HashRouter>
    );
  }
}