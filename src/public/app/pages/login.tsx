import FormWrapper from '../components/form-wrapper'
import FormItem from '../components/form-item'
import Button from '../components/button-generic'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function login() {
    console.log('login executed')
    return ReactDOM.render(
      <div className = 'flex column pageWrapper center'>
        <div className="flex column userWrapper">
          <h1>Snooze you Lose</h1>
          <p className="noMarginsPadding">or how sleeping in really hurts your bottom line</p>
        </div>
        <FormWrapper
          buttonText = 'login'
          url = 'http://localhost:8000/authorized'
          noValidation = {true}
          method = 'post'
          >
          <TextForm
            title = 'email'
            placeholder = 'type in your email'
            />
          <PasswordForm
            title = 'password'
            placeholder = 'type in your password'
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
