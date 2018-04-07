import {TestApp} from '../public/test';
import { Thing } from '../public/index';
import {populate} from '../public/actions/user-data';
import appReducers from '../public/reducers/app-reducers';

import * as React from 'react'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import counterApp from './reducers'
// import App from './containers/App'
import * as reactDOMServer from 'react-dom/server'


function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src='./rollup/bundle.js'></script>
      </body>
    </html>
    `
}

// function app() {
//     console.log('store', store)
//     return ReactDOM.render(
//         <Provider store = { store }>
//             <TestApp/>
//         </Provider>,
//       document.getElementById('app')
//     );
// }




function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(appReducers, composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
        )
    ))

    // Render the component to a string
    const html = reactDOMServer.renderToString(Thing)
    // // Grab the initial state from our Redux store
    const preloadedState = store.getState()  
    // // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}

export default handleRender;