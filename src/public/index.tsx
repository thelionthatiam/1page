// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
import { TestApp } from './test';
import { populate } from './actions/user-data';
import appReducers from './reducers/app-reducers';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';



// var allTags = document.body.getElementsByTagName('*');
// var ids = [];

// for (var tg = 0; tg< allTags.length; tg++) {
//   var tag = allTags[tg];
//   if (tag.id) {
//           ids.push(tag.id);
//     }
// }


// for (let i = 0; i < ids.length; i++) {
//   if (ids[i] === 'new-user') {
//     newAccount();
//   } else if (ids[i] === 'login') {
//     login();
//   } else if (ids[i] === 'app') {
//     app();
//   } else if (ids[i] === 'home') {
//     home();
//   } else if (ids[i] === 'root') {
//     console.log('index working')
//   }
// }

// export function render( Component, props, elID ) {
//   ReactDOM.render(
//       React.createElement(Component, props, null),
//       document.getElementById(elID)
//   ); 
// }

const store = createStore(appReducers, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
    )
))
function app() {
    console.log('store', store)
    return ReactDOM.render(
        <Provider store = { store }>
            <TestApp/>
        </Provider>,
      document.getElementById('app')
    );
}


// const preloadedState = window.__PRELOADED_STATE__
//  
// // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__
//  
// // Create Redux store with initial state

//  
// // ReactDOM.render(
// //   <Provider store={store}>
// //     <TestApp />
// //   </Provider>,
// //   document.getElementById('app')
// // )


// const Thing = <Provider store = {store}><TestApp/></Provider>


// ReactDOM.hydrate(
//   <Provider store={store}>
//     <TestApp />
//   </Provider>,
//   document.getElementById('app')
// )



export { populate, app };
