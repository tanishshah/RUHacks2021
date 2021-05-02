import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navi from './Components/Navi.js';
import Login from './Components/Login.js';
import Panel from './Components/Panel.js';
import LandingPage from './Components/LandingPage.js';

function App() {
  return (
    <div>
      <Router>
        <Navi/>
        <Switch>
          <Route path="/Login" exact component={Login}/>
          <Route path="/Panel" exact component={Panel}/>
          <Route path="/" exact component={LandingPage}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;

/*

    */
