import {BrowserRouter, Link, Redirect, Route, Switch} from "react-router-dom";
import FormItem from "./components/form-item";
import FormWrapper from "./components/form-wrapper";
import Button from './components/button-generic'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <div className="login-img-wrapper">
          <div className="home-navigation-bar">
            <div className="home-title-wrapper">
              <div className="home-logo-wrapper">
                <img className="home-icon fadeIn" src="/icons/logo-placeholder.svg"/>
              </div>
              <div className="home-title-text-wrapper">
                <h1 className="home-title">snooze you lose</h1>
                <h4 className="home-subtitle">Or how sleeping in can hurt your bottom line.</h4>
              </div>
            </div>
            <div className="home-navigation-wrapper">
              <ul className="home-navigation-list">
                <a href="#features-section">
                  <li className="home-navigation-item">features</li>
                </a>
                <a href="#about-section">
                  <li className="home-navigation-item">about</li>
                </a>
                <a href="/dummy-route">
                  <li className="home-navigation-item">pricing</li>
                </a>
                <a href="/to-login">
                  <li className="home-navigation-item">log in</li>
                </a>
                <li className="home-navigation-item">
                  <a href="/new-account">
                    <button className="home-create-account">create account</button>
                  </a>
                </li>
              </ul>
            </div>            
          </div>
          <div className = 'login-wrapper'>
            <div className ="flex column userWrapper">
              <h3 className="formTitle">login</h3>
              <p>hi {window.permission}</p>
              <FormWrapper
                buttonText = 'login'
                url = 'http://localhost:8000/api/authorized'
                noValidation = {false}
                method = 'post'
                >
                <FormItem
                  title = 'email'
                  placeholder = 'type in your email'
                  imgSrc = '/icons/black/mail.svg'
                  />
                <FormItem
                  title = 'password'
                  placeholder = 'type in your password'
                  imgSrc = '/icons/black/key.svg'
                  type = 'password'
                  newPass = {false}
                  />
              </FormWrapper>
              <div className="flex column userWrapper">
                <form action="/forgot-password" method="get">
                  <button className="no" type="submit">forgot password</button>
                </form>
              </div>
            </div>
          </div>
          <div className="home-tryit-wrapper">
            <a href="/app">
              <button className="home-try">try it</button>
            </a>
            <img className="icon" src="/icons/white/forward-1.svg"/>
          </div>
        </div>
        <div className="home-try-alarm-wrapper" id="features-section">
          <h1>Add Alarm trial</h1>
        </div>
        <div className="home-about-wrapper" id="about-section">
          <h1>About section</h1>
          <div className="home-about-wrapper-center">
            <div className="home-about-wrapper-square"></div>
            <div className="home-about-wrapper-square"></div>
            <div className="home-about-wrapper-square"></div>
            <div className="home-about-wrapper-square"></div>
          </div>
        </div>
        <div className="home-footer-wrapper">
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam</p>
          <div className="home-footer-icon-wrapper">
            <img className="icon" src="/icons/white/forward-1.svg"/>
            <img className="icon" src="/icons/white/forward-1.svg"/>
            <img className="icon" src="/icons/white/forward-1.svg"/>
            <img className="icon" src="/icons/white/forward-1.svg"/>
          </div>
        </div>
      </div>
    );
  }
}

function login() {
  return ReactDOM.render(
    <Login/>, 
  document.getElementById('login'));
}

export default login;





// function login() {
//     console.log('login executed')
//     return ReactDOM.render(
//         <div className ="flex column userWrapper login">
//           <h3 className="formTitle">login</h3>
//           <FormWrapper
//             buttonText = 'login'
//             url = 'http://localhost:8000/api/authorized'
//             noValidation = {true}
//             method = 'post'
//             >
//             <FormItem
//               title = 'email'
//               placeholder = 'type in your email'
//               imgSrc = '/icons/mail.svg'
//               />
//             <FormItem
//               title = 'password'
//               placeholder = 'type in your password'
//               imgSrc = '/icons/key.svg'
//               type = 'password'
//               newPass = {false}
//               />
//           </FormWrapper>
//           <FormWrapper
//             buttonText = 'home'
//             url = 'http://localhost:8000/home-redirect'
//             noValidation = {true}
//             method = 'get'
//             />
//           <FormWrapper
//             buttonText = 'create new account'
//             url = 'http://localhost:8000/new-account'
//             noValidation = {true}
//             method = 'get'
//             />
//           <div className="flex column userWrapper">
//             <form action="/forgot-password" method="get">
//               <button className="no" type="submit">forgot password</button>
//             </form>
//             <form method='get' action='/splash'>
//               <button type='submit' className='no'>splash page</button>
//             </form>
//           </div>
//         </div>,
//       document.getElementById('login')
//     );
// }

// export default login;