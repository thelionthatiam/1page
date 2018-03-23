import React, { Component } from "react";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import Home from "./profile";
import GraphWrapper from "./user-graph";
import Settings from "./settings";
import SpaNewAccount from "./new-account"
import AlarmClock from "./alarm-clock"


// interface AppStates {
//   permission: string;
//   email?:string;
//   uuid?:string;
// }

//   componentDidMount() {
//     fetch("http://localhost:8000/permission", {
//         method: "get",
//         credentials : 'same-origin',
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json"
//         }
//       })
//       .then((res) => res.json())
//       .then((body) => {
//         console.log(JSON.parse(body))
//         let userSession = JSON.parse(body);
//         this.setState({
//           permission: userSession.permission,
//           uuid: userSession.uuid,
//           name: userSession.name,
//           email: userSession.email
//         })
//       })
//       .catch((error) => {
//         console.log(error.stack);
//       });
//   }

//   render() {
    // console.log('state', this.state)
    // let isLoggedIn;
    // let routes;
    // if (this.state.permission === 'guest') {
    //   isLoggedIn = <p className = 'app-menu-text' > Hi, guest </p>
    //   routes = (
    //         <div className="app-content">
    //           <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
    //           <Route path = '/alarms' component = {AlarmClock} />
    //           <Route Path = '/organizations' component = {Organizations} />
    //           <Route path = '/insights' component = {SpaNewAccount} />
    //           <Route path = '/profile' component = {Profile} />
    //           <Route path = '/settings' component = {Settings} />
    //         </div>
    //       )
    // } else if (this.state.permission === 'user') {
    //   isLoggedIn = <p className = 'app-menu-text' > Welcome, {this.state.email}! </p>
    //   routes = (
    //         <div className="app-content">
    //           <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
    //           <Route path = '/alarms' component = {AlarmClock} />
    //           <Route Path = '/organizations' component = {Organizations} />
    //           <Route path = '/insights' component = {GraphWrapper} />
    //           <Route path = '/profile' component = {Profile} />
    //           <Route path = '/settings' component = {Settings} />
    //         </div>
    //       )
    // }

interface AppProps {
  message : string;
  isLoggedIn : () => string;
  isNotLoggedIn : () => string;
  permissionChecker : () => string;
}

class App extends Component {
  props: AppProps

  constructor( props ) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.permissionChecker()
  }

  render() {
    return (
      <BrowserRouter>
        <div className = 'app-wrapper'>
          <ul className="app-menu">
            <div className = 'app-menu-title-wrapper'>
              <img className = 'formIcon fadeIn' src = '/icons/logo-placeholder.svg' />
              <h1 className = 'app-menu-title'>s.y.l.</h1>
            </div>
            <li className = 'app-menu-li' id = 'logout'>{this.props.message}</li>
            <button onClick = {this.props.isLoggedIn}>log in</button>
            <button onClick = {this.props.isNotLoggedIn}>log out</button>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/clock-alarm.svg' />
              <Link to="/alarms" className = 'app-menu-text'>alarms</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/squares.svg' />
              <Link to="/organization" className = 'app-menu-text'>organizations</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/graph-bar.svg' />
              <Link to="/insights" className = 'app-menu-text'>insights</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/user-fem.svg' />
              <Link to="/profile" className = 'app-menu-text'>profile</Link>
            </li>
            <li className = 'app-menu-li'>
              <img className = 'formIcon fadeIn' src = '/icons/white/mixer.svg' />
              <Link to="/settings" className = 'app-menu-text'>settings</Link>
            </li>
            <li className = 'app-menu-li' id = 'logout'>
              <img className = 'formIcon fadeIn' src = '/icons/white/back-1.svg' />
              <Link to="/new-account" className = 'app-menu-text' >logout</Link>
            </li>
          </ul>
          <div className="app-content">
              <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
              <Route path = '/alarms' component = {AlarmClock} />
              <Route Path = '/organizations' component = {Settings} />
              <Route path = '/insights' component = {GraphWrapper} />
              <Route path = '/profile' component = {Settings} />
              <Route path = '/settings' component = {Settings} />
            </div>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
