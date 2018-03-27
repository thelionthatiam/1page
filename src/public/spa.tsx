import React, { Component } from "react";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import Home from "./components/profile";
import GraphWrapper from "./components/user-graph";
import Settings from "./components/settings";
import SpaNewAccount from "./new-account"
import AlarmsWithActions from "./containers/alarm-actions";
import Organizations from "./components/organizations";

interface AppProps {
  message : string;
  permission : string;
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
    if (this.props.permission === 'guest') {
      return (
        <BrowserRouter>
          <div className = 'app-wrapper'>
            <ul className="app-menu">
              <div className = 'app-menu-title-wrapper'>
                <img className = 'formIcon fadeIn' src = '/icons/logo-placeholder.svg' />
                <h1 className = 'app-menu-title'>s.y.l.</h1>
              </div>
              <li className = 'app-menu-li' id = 'logout'>{this.props.permission}</li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/clock-alarm.svg' />
                <Link to="/app/alarms" className = 'app-menu-text'>alarms</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/squares.svg' />
                <Link to="/app/orgs" className = 'app-menu-text '>organizations</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/graph-bar.svg' />
                <Link to="/app/insights" className = 'app-menu-text-disabled disabled-link'>insights</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/user-fem.svg' />
                <Link to="/app/profile" className = 'app-menu-text-disabled disabled-link'>profile</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/mixer.svg' />
                <Link to="/app/settings" className = 'app-menu-text-disabled disabled-link'>settings</Link>
              </li>

              <li className = 'app-menu-li' id = 'logout'>
                <img className = 'formIcon fadeIn' src = '/icons/white/heart.svg' />
                <form action = "/to-login" method = "get">
                  <button type = "submit" className = "app-menu-text" >log in</button>
                </form>
              </li>

              <li className = 'app-menu-li' id = 'logout'>
                <img className = 'formIcon fadeIn' src = '/icons/white/back-1.svg' />
                <form action = "/log-out" method = "post">
                  <button type = "submit" className = "app-menu-text-disabled disabled-link" >logout</button>
                </form>
              </li>

            </ul>
            <div className="app-content">
              <Route path='/app/' render= {() => <Redirect to = '/app/alarms'/>}/>
              <Route path='/app/alarms' component={AlarmsWithActions}/>
              <Route path='/app/orgs' component={Organizations}/>
              <Route path='/app/insights' component={GraphWrapper}/>
              <Route path='/app/profile' component={Settings}/>
              <Route path='/app/settings' component={Settings}/>
            </div>
          </div>
        </BrowserRouter>
      );
    } else if (this.props.permission === 'user') {
      return (
        <BrowserRouter>
          <div className='app-wrapper'>
            <ul className="app-menu">
              <div className='app-menu-title-wrapper'>
                <img className='formIcon fadeIn' src='/icons/logo-placeholder.svg'/>
                <h1 className='app-menu-title'>s.y.l.</h1>
              </div>
              <li className='app-menu-li' id='logout'>{this.props.permission}</li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/clock-alarm.svg'/>
                <Link to="/app/alarms" className='app-menu-text'>alarms</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/squares.svg'/>
                <Link to="/app/orgs" className='app-menu-text '>organizations</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/graph-bar.svg'/>
                <Link to="/app/insights" className='app-menu-text'>insights</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/user-fem.svg'/>
                <Link to="/app/profile" className='app-menu-text'>profile</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/mixer.svg'/>
                <Link to="/app/settings" className='app-menu-text'>settings</Link>
              </li>

              <li className='app-menu-li' id='logout'>
                <img className='formIcon fadeIn' src='/icons/white/back-1.svg'/>
                <form action="/log-out" method="post">
                  <button type="submit" className="app-menu-text">logout</button>
                </form>
              </li>

            </ul>
            <div className="app-content">
              <Route path='/app/' render= {() => <Redirect to = {'/app/accounts/' + this.props.email + 'alarms'}/>}/>
              <Route path={'/app/accounts/' + this.props.email + 'alarms'} component={AlarmsWithActions}/>
              <Route path={'/app/accounts/' + this.props.email + 'orgs'} component={Organizations}/>
              <Route path={'/app/accounts/' + this.props.email + 'insights'} component={GraphWrapper}/>
              <Route path={'/app/accounts/' + this.props.email + 'profile'} component={Settings}/>
              <Route path={'/app/accounts/' + this.props.email + 'settings'} component={Settings}/>
            </div>
          </div>
        </BrowserRouter>
      );
    } else {
      <h1>something broke</h1>
    }

  }
}


export default App;
