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
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><Link exact to="/" activeClassName = 'spa-active'>Home</Link></li>
            <li><Link to="/stuff" activeClassName = 'spa-active'>Stuff</Link></li>
            <li><Link to="/contact" activeClassName = 'spa-active'>Contact</Link></li>
            <li><Link to="/new-account" activeClassName = 'spa-active'>New Accout</Link></li>
          </ul>
          <div className="content">
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
