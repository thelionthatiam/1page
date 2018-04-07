import Button from "./components/button-generic";
import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";
import FormItem from "./components/form-item";
import FormWrapper from "./components/form-wrapper";
import React, { Component } from "react";
import ReactDOM from "react-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>

      <div className = "home-img-wrapper">
        <div className = "home-navigation-bar">
          <div className = "home-title-wrapper">
            <div className = "home-logo-wrapper">
              <img className = "home-icon fadeIn" src = "/icons/logo-placeholder.svg" />
            </div>
            <div className = "home-title-text-wrapper">
              <h1 className = "home-title">snooze you lose</h1>
              <h4 className = "home-subtitle">Or how sleeping in can hurt your bottom line.</h4>
            </div>
          </div>
          <div className = "home-navigation-wrapper">
            <ul className = "home-navigation-list">
              <a href = "#features-section"><li className = "home-navigation-item">features</li></a>
              <a href = "#about-section"><li className = "home-navigation-item">about</li></a>
              <a href = "/dummy-route"><li className = "home-navigation-item">pricing</li></a>
              <a href = "/to-login"><li className = "home-navigation-item">log in</li></a>
              <li className = "home-navigation-item">
                <a href = "/new-account">
                  <button className = "home-create-account">create account</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className = "home-tryit-wrapper">
          <a href = "/app">
            <button className = "home-try">try it</button>
          </a>
          <img className = "icon" src = "/icons/white/forward-1.svg" />
        </div>
      </div>
      <div className = "home-try-alarm-wrapper" id = "features-section">
        <h1>Add Alarm trial</h1>
      </div>
      <div className = "home-about-wrapper" id = "about-section">
        <h1>About section</h1>
        <div className = "home-about-wrapper-center">
          <div className = "home-about-wrapper-square"></div>
          <div className = "home-about-wrapper-square"></div>
          <div className = "home-about-wrapper-square"></div>
          <div className = "home-about-wrapper-square"></div>
        </div>
      </div>
      <div className = "home-footer-wrapper">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam</p>
        <div className = "home-footer-icon-wrapper">
          <img className = "icon" src = "/icons/white/forward-1.svg" />
          <img className = "icon" src = "/icons/white/forward-1.svg" />
          <img className = "icon" src = "/icons/white/forward-1.svg" />
          <img className = "icon" src = "/icons/white/forward-1.svg" />
        </div>
      </div>

      </div>
    );
  }
}

function home() {
    return ReactDOM.render(
        <Home />,
      document.getElementById("home"),
    );
}

export default home;
