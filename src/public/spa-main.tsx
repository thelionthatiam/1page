import App from './components/spa-main'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

function app() {
    return ReactDOM.render(
        <App />,
      document.getElementById('app')
    );
}

export default app;
