"use strict";
// import newAccount from './pages/new-account';
// import login from './pages/login'
//
// var allTags = document.body.getElementsByTagName('*');
// var ids = [];
//
// for (var tg = 0; tg< allTags.length; tg++) {
//     var tag = allTags[tg];
//     if (tag.id) {
//             ids.push(tag.id);
//      }
// }
// console.log(ids)
//
// for (let i = 0; i < ids.length; i++) {
//   console.log(ids[i])
//   if (ids[i] === 'new-user') {
//     newAccount();
//   } else if (ids[i] === 'login') {
//     login();
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducer from './reducers/index'
// import HelloWorld from './containers/HelloWorld'
// import Counter from './components/counter'
//
// let store = createStore(reducer) // this is store
//
// const render = () => ReactDOM.render(
//   <Provider store={store}>
//     <HelloWorld />
//     <Counter
//       value = { store.getState() }
//       onIncrement = { () => store.dispatch({type: 'INCRIMENT'}) }
//       onDecrement = { () => store.dispatch({type: 'DECREMENT'}) }
//     />
//   </Provider>,
// 	document.getElementById('login')
// );
//
// render()
// store.subscribe(render)
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var redux_1 = require("redux");
var counter_1 = require("./components/counter");
var counter_2 = require("./reducers/counter");
exports.store = redux_1.createStore(counter_2.default);
console.log(exports.store.getState());
function current() {
    var state = exports.store.getState();
    return state.current;
}
function total() {
    var state = exports.store.getState();
    return state.total;
}
var render = function () { return react_dom_1.default.render(react_1.default.createElement(counter_1.default, { current: current(), total: total(), onIncrement: function () { return exports.store.dispatch({ type: 'INCREMENT' }); }, onDecrement: function () { return exports.store.dispatch({ type: 'DECREMENT' }); }, onReset: function () { return exports.store.dispatch({ type: 'RESET' }); } }), document.getElementById('login')); };
render();
exports.store.subscribe(render);
//# sourceMappingURL=index.js.map