"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var new_account_1 = require("./new-account");
var spa_main_1 = require("./spa-main");
var login_1 = require("./login");
var allTags = document.body.getElementsByTagName('*');
var ids = [];
for (var tg = 0; tg < allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
        ids.push(tag.id);
    }
}
for (var i = 0; i < ids.length; i++) {
    console.log(ids[i]);
    if (ids[i] === 'new-user') {
        new_account_1.default();
    }
    else if (ids[i] === 'login') {
        login_1.default();
    }
    else if (ids[i] === 'menu') {
        spa_main_1.default();
    }
}
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
// const render = () => ReactDOM .render(
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
// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { createStore } from 'redux'
// import Counter from './components/counter'
// import counter from './reducers/counter'
//
// export const store = createStore(counter)
// console.log(store.getState())
//
// function current() {
//   let state = store.getState()
//   return state.current;
// }
//
// function total() {
//   let state = store.getState()
//   return state.total;
// }
//
// const render = () => ReactDOM.render (
//   <Counter
//     current = { current() }
//     total = { total() }
//     onIncrement = { () => store.dispatch({type: 'INCREMENT'}) }
//     onDecrement = { () => store.dispatch({type: 'DECREMENT'}) }
//     onReset = { () => store.dispatch({type: 'RESET'})}
//   />,
//   document.getElementById('login')
// )
//
// render()
// store.subscribe(render)
//# sourceMappingURL=index.js.map