import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import NoMatch from './pages/nomatch';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loading';
import Notice from './pages/ui/notice';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';

export default class IRouter extends Component{
  render(){
    return (
      <HashRouter>
          <App>
              <Route path='/login' component={Login}/>
              <Route path='/admin' render={()=>
                <Admin>
                  <Switch>
                    <Route path='/admin/ui/buttons' component={Buttons}></Route>
                    <Route path='/admin/ui/modals' component={Modals}></Route>
                    <Route path='/admin/ui/loadings' component={Loadings}></Route>
                    <Route path='/admin/ui/notification' component={Notice}></Route>
                    <Route path='/admin/ui/messages' component={Messages}></Route>
                    <Route path='/admin/ui/tabs' component={Tabs}></Route>
                    <Route path='/admin/ui/gallery' component={Gallery}></Route>
                    <Route path='/admin/ui/carousel' component={Carousel}></Route>
                    <Route path='/admin/form/login' component={FormLogin}></Route>
                    <Route path='/admin/form/reg' component={Register}></Route>
                    <Route path='/admin/table/basic' component={BasicTable}></Route>
                    <Route component={NoMatch}/>
                  </Switch>
                </Admin>
              }/>
              <Route path='/order/detail' component={Login}/>
          </App>
      </HashRouter>
    );
  }
}