// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
// import appReducers from './reducers/app-reducers';
import { TestApp } from './test';
import AlarmClock from './components/alarm-clock'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { POPULATE, populate } from './actions/user-data'


let initialState = {userData: 'foo'}


// runs multiple times for checking purposes
// store calls the reducer which updates the state based on the actions

function reducer(state = initialState, action) {
    console.log('~~~~~~~~~~~~~~~~~~~~1. reducer, populate user data', action, state)
    switch (action.type) {
        case POPULATE:
            console.log('reducer POPULATE', action.userData)
            return Object.assign({}, state, { userData:action.userData }) 
        default:
            console.log('~~~~~~~~~~~~~~~~~~~~2. reducer default')
            return state;
    }
}  

let store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
    )
))


function app() {
  ReactDOM.render(
    <Provider store = { store }>
        <TestApp/>
    </Provider>,
  document.getElementById('test'));
}


function alarmClock() {
    ReactDOM.render(
        <AlarmClock/>,
    document.getElementById('alarm'))
}


export { app, store, populate, AlarmClock };




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