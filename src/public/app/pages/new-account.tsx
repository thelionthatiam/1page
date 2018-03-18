import FormWrapper from '../components/form-wrapper'
import FormItem from '../components/form-item'
import Button from '../components/button-generic'

import * as React from 'react';
import * as ReactDOM from 'react-dom';

function newAccount() {
  return ReactDOM.render(
    <div className="flex pageWrapper">
      <div className="flex column userWrapper">
        <h3 className="formTitle">user info</h3>
          <FormWrapper
            buttonText = 'create new account'
            url = 'http://localhost:8000/accounts'
            method = 'post'
            >
            <FormItem
              title = 'name'
              placeholder = 'type in your username'
              imgSrc = {'/icons/user-fem.svg'}
              />
            <FormItem
              title = 'email'
              placeholder = 'type in your email'
              imgSrc = {'/icons/mail.svg'}
              />
            <FormItem
              title = 'phone'
              placeholder = 'type in your phone number'
              imgSrc = {'/icons/phone.svg'}
              />
            <FormItem
              title = 'password'
              placeholder = 'type in your password'
              imgSrc = {'/icons/key.svg'}
              type = 'password'
              newPass = {true}
              />
          </FormWrapper>
          <FormWrapper
            buttonText = 'login'
            method = 'get'
            url = 'http://localhost:8000/'
            noValidation = {true}
            />
        </div>
      </div>,
    document.getElementById('new-user')
  );
}

export default newAccount;
