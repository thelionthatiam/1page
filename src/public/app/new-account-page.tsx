import FormWrapper from './form-wrapper'
import TextForm from './form-item-text'
import GraphWrapper from './user-graph'
import PersonList from './ajax-testing'
import PasswordForm from './form-item-password'
import Button from './button-generic'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function newAccount() {
  return ReactDOM.render(
    <FormWrapper
      buttonText = 'create new account'
      url = 'http://localhost:8000/accounts'
      >
      <TextForm
        title = 'username'
        placeholder = 'type in your username'
        />
      <TextForm
        title = 'email'
        placeholder = 'type in your email'
        />
      <TextForm
        title = 'phone'
        placeholder = 'type in your phone number'
        />
      <PasswordForm
        title = 'password'
        placeholder = 'type in your password'
        />
    </FormWrapper>,
    document.getElementById('new-user')
  );
}


export default newAccount;
