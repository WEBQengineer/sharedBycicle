import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import About from './../route1/About';
import Topic from './../route1/Topic';
import Home from './Home';

export default class IRouter extends Component{
  render(){
    return (
      <Router>
        <Home>
          <Switch>
            <Route  path='/main' render={() => 
              <Main>
                <Route path='/main/a' component={About}></Route>
              </Main>
            }></Route>
            <Route path='/topics' component={Topic}></Route>
            <Route path='/about' component={About}></Route>
          </Switch>
        </Home>
      </Router>
    );
  }
}