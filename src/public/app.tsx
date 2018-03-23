import AppWithActions from './containers/appActions';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import permissions from './reducers/permissions'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(permissions, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
    )
))


function app() {
    return ReactDOM.render(
        <Provider store = {store}>
            <AppWithActions/>
        </Provider>,
      document.getElementById('app')
    );
}

export default app;
