import App from './components/spa-main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import permissions from './reducers/permissions'
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let store = createStore(permissions)

function app() {
    return ReactDOM.render(
        <Provider>
            <App/>
        </Provider>,
      document.getElementById('app')
    );
}

export default app;
