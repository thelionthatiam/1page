import React, { Component } from "react";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import ProfileWithActions from "./containers/profile-actions";
import GraphWrapper from "./components/user-graph";
import SettingsWithActions from "./containers/settings-actions";
import SpaNewAccount from "./new-account"
import AlarmsWithActions from "./containers/alarm-actions";
import OrgsWithActions from "./containers/organizations-actions";
import AlarmClock from './components/alarm-clock';
import Orgs from './components/guest-orgs'


interface AppProps {
  message : string;
  permission : string;
  email : string;
  userData : Object;
  isLoggedIn : () => string;
  isNotLoggedIn : () => string;
  permissionChecker : () => string;
  getUserData : () => Object;
}

interface Profile {

}

class App extends Component {
  props: AppProps

  constructor( props ) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.props.getUserData()
    this.props.permissionChecker()
  }

  render() {
    console.log(this.props)
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
                <Link to="/app/guest/alarms" className = 'app-menu-text'>alarms</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/squares.svg' />
                <Link to="/app/guest/orgs" className = 'app-menu-text '>organizations</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/graph-bar.svg' />
                <Link to="/app/guest/insights" className = 'app-menu-text-disabled disabled-link'>insights</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/user-fem.svg' />
                <Link to="/app/guest/profile" className = 'app-menu-text-disabled disabled-link'>profile</Link>
              </li>

              <li className = 'app-menu-li'>
                <img className = 'formIcon fadeIn' src = '/icons/white/mixer.svg' />
                <Link to="/app/guest/settings" className = 'app-menu-text-disabled disabled-link'>settings</Link>
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
              <Route path='/app/guest' render= {() => <Redirect to = '/app/guest/alarms'/>}/>
              <Route path='/app/guest/alarms' component={AlarmsWithActions}/>
              <Route path='/app/guest/orgs' component={Orgs}/>
              <Route path='/app/guest/insights' component={GraphWrapper}/>
              <Route path='/app/guest/profile' component={GraphWrapper}/>
              <Route path='/app/guest/settings' component={GraphWrapper}/>
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
                <Link to = { "/app/accounts/" + this.props.profile.email + "/alarms" } className='app-menu-text'>alarms</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/squares.svg'/>
                <Link to = { "/app/accounts/" + this.props.profile.email + "/orgs" } className='app-menu-text '>organizations</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/graph-bar.svg'/>
                <Link to = { "/app/accounts/" + this.props.profile.email + "/insights" } className='app-menu-text'>insights</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/user-fem.svg'/>
                <Link to = { "/app/accounts/" + this.props.profile.email + "/profile" } className='app-menu-text'>profile</Link>
              </li>

              <li className='app-menu-li'>
                <img className='formIcon fadeIn' src='/icons/white/mixer.svg'/>
                <Link to = { "/app/accounts/" + this.props.profile.email + "/settings" } className='app-menu-text'>settings</Link>
              </li>

              <li className='app-menu-li' id='logout'>
                <img className='formIcon fadeIn' src='/icons/white/back-1.svg'/>
                <form action="/log-out" method="post">
                  <button type="submit" className="app-menu-text">logout</button>
                </form>
              </li>
            </ul>
            <div className="app-content">
              <Route path = '/app/account' render= {() => <Redirect to = {'/app/accounts/' + this.props.profile.email + '/alarms'}/>}/>
              <Route path = { '/app/accounts/' + this.props.profile.email + '/alarms' } component= { AlarmsWithActions }/>
              <Route path = { '/app/accounts/' + this.props.profile.email + '/orgs' } component= { OrgsWithActions }/>
              <Route path = { '/app/accounts/' + this.props.profile.email + '/insights' } component= { GraphWrapper }/>
              <Route path = { '/app/accounts/' + this.props.profile.email + '/profile' } component= { ProfileWithActions }/>
              <Route path = { '/app/accounts/' + this.props.profile.email + '/settings' } component= { SettingsWithActions }/>
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
