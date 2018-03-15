import FormWrapper from './form-wrapper'
import TextForm from './form-item-text'
import GraphWrapper from './user-graph'
import PersonList from './ajax-testing'
import PasswordForm from './form-item-password'
import Button from './button-generic'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function login() {
    return ReactDOM.render(
      <div>
        <FormWrapper
          buttonText = 'login'
          url = 'http://localhost:8000/'
          />
        <FormWrapper
          buttonText = 'create new account'
          url = 'http://localhost:8000/new-account'
          />
      </div>,
      document.getElementById('login')
    );
}

export default login;
