import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Tenants from "./components/tenants";
import Tenant from "./components/tenant";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route path="/tenants" render={(props)=><Tenants {...props}/>} />
            <Route path="/tenant/:id" render={(props)=><Tenant {...props}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
