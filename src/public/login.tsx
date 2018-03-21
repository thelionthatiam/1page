import FormWrapper from './components/form-wrapper'
import FormItem from './components/form-item'
import Button from './components/button-generic'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function login() {
    console.log('login executed')
    return ReactDOM.render(
        <div className ="flex column userWrapper login">
          <h3 className="formTitle">login</h3>
          <FormWrapper
            buttonText = 'login'
            url = 'http://localhost:8000/api/authorized'
            noValidation = {true}
            method = 'post'
            >
            <FormItem
              title = 'email'
              placeholder = 'type in your email'
              imgSrc = '/icons/mail.svg'
              />
            <FormItem
              title = 'password'
              placeholder = 'type in your password'
              imgSrc = '/icons/key.svg'
              type = 'password'
              newPass = {false}
              />
          </FormWrapper>
          <FormWrapper
            buttonText = 'home'
            url = 'http://localhost:8000/home-redirect'
            noValidation = {true}
            method = 'get'
            />
          <FormWrapper
            buttonText = 'create new account'
            url = 'http://localhost:8000/new-account'
            noValidation = {true}
            method = 'get'
            />
          <div className="flex column userWrapper">
            <form action="/forgot-password" method="get">
              <button className="no" type="submit">forgot password</button>
            </form>
            <form method='get' action='/splash'>
              <button type='submit' className='no'>splash page</button>
            </form>
          </div>
        </div>,
      document.getElementById('login')
    );
}

export default login;
