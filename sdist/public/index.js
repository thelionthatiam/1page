"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
// import appReducers from './reducers/app-reducers';
var test_1 = require("./test");
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
var user_data_1 = require("./actions/user-data");
exports.populate = user_data_1.populate;
var initialState = { userData: 'foo' };
// runs multiple times for checking purposes
// store calls the reducer which updates the state based on the actions
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    console.log('~~~~~~~~~~~~~~~~~~~~1. reducer, populate user data', action, state);
    switch (action.type) {
        case user_data_1.POPULATE:
            console.log('reducer POPULATE', action.userData);
            return Object.assign({}, state, { userData: action.userData });
        default:
            console.log('~~~~~~~~~~~~~~~~~~~~2. reducer default');
            return state;
    }
}
var store = redux_1.createStore(reducer, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
exports.store = store;
console.log('~~~~~~~~~~~~~~~~~~~~ 3. store', store);
function app() {
    ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(test_1.TestApp, null)), document.getElementById('app'));
}
exports.app = app;
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
//# sourceMappingURL=index.js.map