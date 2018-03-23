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

interface AppStates {
  permission: string;
  email?:string;
  uuid?:string;
}

class App extends Component {
  state:AppStates

  constructor(props) {
    super(props)
    this.state = {
      permission:'guest',
      email:'',
    }
  }

  componentDidMount() {
    fetch("http://localhost:8000/permission", {
        method: "get",
        credentials : 'same-origin',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })
      .then((res) => res.json())
      .then((body) => {
        console.log(JSON.parse(body))
        let userSession = JSON.parse(body);
        this.setState({
          permission: userSession.permission,
          uuid: userSession.uuid,
          name: userSession.name,
          email: userSession.email
        })
      })
      .catch((error) => {
        console.log(error.stack);
      });
  }

  render() {
    console.log('state', this.state)
    let isLoggedIn;
    let routes;
    if (this.state.permission === 'guest') {
      isLoggedIn = <p className = 'app-menu-text' > Hi, guest </p>
      routes = (
            <div className="app-content">
              <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
              <Route path = '/alarms' component = {SpaNewAccount} />
              <Route path = '/stuff' component = {SpaNewAccount} />
              <Route path = '/contact' component = {SpaNewAccount} />
              <Route path = '/new-account' component = {SpaNewAccount} />
            </div>
          )
    } else if (this.state.permission === 'user') {
      isLoggedIn = <p className = 'app-menu-text' > Welcome, {this.state.email}! </p>
      routes = (
            <div className="app-content">
              <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
              <Route path = '/alarms' component = {Contact} />
              <Route path = '/stuff' component = {Contact} />
              <Route path = '/contact' component = {Contact} />
              <Route path = '/new-account' component = {Contact} />
            </div>
          )
    }
  
    return (
      <BrowserRouter>
        <div className = 'app-wrapper'>
          <ul className="app-menu">
            <div className = 'app-menu-title-wrapper'>
              <img className = 'formIcon fadeIn' src = '/icons/logo-placeholder.svg' />
              <h1 className = 'app-menu-title'>s.y.l.</h1>
            </div>
            <li className = 'app-menu-li' id = 'logout'>{isLoggedIn}</li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/clock-alarm.svg' />
              <Link to="/alarms" className = 'app-menu-text'>alarms</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/squares.svg' />
              <Link to="/stuff" className = 'app-menu-text'>organizations</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/graph-bar.svg' />
              <Link to="/new-account" className = 'app-menu-text'>insights</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/user-fem.svg' />
              <Link to="/contact" className = 'app-menu-text'>profile</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/mixer.svg' />
              <Link to="/new-account" className = 'app-menu-text'>settings</Link>
            </li>
            <li className = 'app-menu-li' id = 'logout'>
              <img className = 'formIcon fadeIn' src = '/icons/white/back-1.svg' />
              <Link to="/new-account" className = 'app-menu-text' >logout</Link>
            </li>
          </ul>
          {routes}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
