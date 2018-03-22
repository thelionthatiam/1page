import React, { Component } from "react";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Switch
} from 'react-router-dom';

import Home from "./spa-home";
import Stuff from "./spa-stuff";
import Contact from "./spa-contact";
import SpaNewAccount from "./spa-new-account"
import AlarmClock from "./alarm-clock"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <BrowserRouter>
        <div className = 'app-wrapper'>
          <ul className="app-menu">
            <div className = 'app-menu-title-wrapper'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/logo-placeholder.svg'
              />
              <h1 className = 'app-menu-title'>s.y.l.</h1>
            </div>
            <li className = 'app-menu-li'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/clock-alarm.svg'
              />
              <Link to="/alarms" className = 'app-menu-text'>alarms</Link>
            </li>
            <li className = 'app-menu-li'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/squares.svg'
              />
              <Link to="/stuff" className = 'app-menu-text'>organizations</Link>
            </li>
            <li className = 'app-menu-li'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/graph-bar.svg'
              />
              <Link to="/new-account" className = 'app-menu-text'>insights</Link>
            </li>
            <li className = 'app-menu-li'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/user-fem.svg'
              />
              <Link to="/contact" className = 'app-menu-text'>profile</Link>
            </li>
            <li className = 'app-menu-li'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/mixer.svg'
              />
              <Link to="/new-account" className = 'app-menu-text'>settings</Link>
            </li>
            <li className = 'app-menu-li' id = 'logout'>
              <img
                className = 'formIcon fadeIn'
                src = '/icons/white/back-1.svg'
              />
              <Link to="/new-account" className = 'app-menu-text' >logout</Link>
            </li>
          </ul>
          <div className="app-content">
            <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
            <Route path = '/alarms' component = {AlarmClock} />
            <Route path = '/stuff' component = {Stuff} />
            <Route path = '/contact' component = {Contact} />
            <Route path = '/new-account' component = {SpaNewAccount} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
