import Main from './components/spa-main'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function menu() {
    return ReactDOM.render(
        <Main />,
      document.getElementById('menu')
    );
}

export default menu;
