// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
// import appReducers from './reducers/app-reducers';
import { TestApp } from './test';
import { AlarmClock } from './alarm-clock'
import * as wp from 'web-push';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { POPULATE, populate } from './actions/user-data'
import { WSAEPFNOSUPPORT } from 'constants';


// wrap around erroring component 
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}



let initialState = {userData: 'foo'}


// runs multiple times for checking purposes
// store calls the reducer which updates the state based on the actions

function reducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE:
            return Object.assign({}, state, { userData:action.userData }) 
        default:
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
    <Provider store = {store}>
        <AlarmClock/>
    </Provider>,
    document.getElementById('alarm'))
}

export { app, store, populate, alarmClock };




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