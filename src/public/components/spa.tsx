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
import AlarmsWithActions from "../containers/alarm-actions";
import Organizations from "./organizations";

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
                <Link to="/alarms" className = 'app-menu-text'>alarms</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/squares.svg' />
                <Link to="/orgs" className = 'app-menu-text '>organizations</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/graph-bar.svg' />
                <Link to="/insights" className = 'app-menu-text-disabled disabled-link'>insights</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/user-fem.svg' />
                <Link to="/profile" className = 'app-menu-text-disabled disabled-link'>profile</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/mixer.svg' />
                <Link to="/settings" className = 'app-menu-text-disabled disabled-link'>settings</Link>
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
                <Route path = '/' render = {() => <Redirect to = '/alarms'/>}/>
                <Route path = '/alarms' component = {AlarmsWithActions} />
                <Route path = '/orgs' component = {Organizations} />
                <Route path = '/insights' component = {GraphWrapper} />
                <Route path = '/profile' component = {Settings} />
                <Route path = '/settings' component = {Settings} />
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
                <Link to="/alarms" className='app-menu-text'>alarms</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/squares.svg'/>
                <Link to="/orgs" className='app-menu-text '>organizations</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/graph-bar.svg'/>
                <Link to="/insights" className='app-menu-text'>insights</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/user-fem.svg'/>
                <Link to="/profile" className='app-menu-text'>profile</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/mixer.svg'/>
                <Link to="/settings" className='app-menu-text'>settings</Link>
              </li>

              <li className='app-menu-li' id='logout'>
                <img className='formIcon fadeIn' src='/icons/white/back-1.svg'/>
                <form action="/log-out" method="post">
                  <button type="submit" className="app-menu-text">logout</button>
                </form>
              </li>

            </ul>
            <div className="app-content">
              <Route path='/' render= {() => <Redirect to = '/alarms'/>}/>
              <Route path='/alarms' component={AlarmsWithActions}/>
              <Route path='/orgs' component={Organizations}/>
              <Route path='/insights' component={GraphWrapper}/>
              <Route path='/profile' component={Settings}/>
              <Route path='/settings' component={Settings}/>
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
