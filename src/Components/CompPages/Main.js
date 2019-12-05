import React,{Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import TableTabs from  './Tabs';
import Complete from  './CompleteFunc2';
import HomePage from  './HomePage';
import Contacts from  './Contacts';




  export default class Main extends React.Component {
    render() {
      return (
      <div className="container-fluid">
        <Switch>
         <Route exact path='/' component={HomePage}/>
         <Route path='/contacts' component={Contacts}/>
         <Route path='/func1' component={TableTabs}/>
         <Route path='/func2' component={Complete}/>
         <Route path='/func3' component={HomePage}/>
        </Switch>
       </div>
      );
    }
  }
