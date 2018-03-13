import FormWrapper from './test-form-wrapper'
import TextForm from './text-form-item'
import GraphWrapper from './user-graph'
import PersonList from './ajax-testing'
import PasswordForm from './password-form-item'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <FormWrapper>
    <TextForm
      title = 'username'
      placeholder = 'type in your username'
      />
    <TextForm
      title = 'email'
      placeholder = 'type in your email'
      />
    <PasswordForm
      title = 'password'
      placeholder = 'type in your password'
      />
  </FormWrapper>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <PersonList />,
//   document.getElementById('branch')
// );
