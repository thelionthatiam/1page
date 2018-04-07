"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import app from './app'
// import newAccount from './new-account';
// import login, { Login } from './login'
// import home from './home'
var test_1 = require("./test");
var user_data_1 = require("./actions/user-data");
exports.populate = user_data_1.populate;
var app_reducers_1 = require("./reducers/app-reducers");
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = require("redux-thunk");
var redux_1 = require("redux");
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
var store = redux_1.createStore(app_reducers_1.default, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware(redux_thunk_1.default)));
function app() {
    console.log('store', store);
    return ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(test_1.TestApp, null)), document.getElementById('app'));
}
exports.app = app;
//# sourceMappingURL=index.js.map