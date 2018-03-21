import Main from '../components/spa-main'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function login() {
    return ReactDOM.render(
        <Main />,
      document.getElementById('login')
    );
}

export default login;
