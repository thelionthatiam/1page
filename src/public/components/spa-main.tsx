import React, { Component } from "react";
import {
  Route,
  Link,
  BrowserRouter
} from 'react-router-dom';
import Home from "./spa-home";
import Stuff from "./spa-stuff";
import Contact from "./spa-contact";
import SpaNewAccount from "./spa-new-account"



class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className = 'app-wrapper'>
          <ul className="app-menu">
            <h1 className = 'app-menu-title'>Simple SPA</h1>
            <li><Link exact to="/" className = 'app-menu-item'>Home</Link></li>
            <li><Link to="/stuff" className = 'app-menu-item'>Stuff</Link></li>
            <li><Link to="/contact" className = 'app-menu-item'>Contact</Link></li>
            <li><Link to="/new-account" className = 'app-menu-item'>New Accout</Link></li>
          </ul>
          <div className="app-content">
            <Route exact path = '/' component = {Home} />
            <Route path = '/stuff' component = {Stuff} />
            <Route path = '/contact' component = {Contact} />
            <Route path = '/new-account' component = {SpaNewAccount} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
