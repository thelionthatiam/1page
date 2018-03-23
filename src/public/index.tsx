import app from './app'
import newAccount from './new-account';
import login from './login'
import home from './home'

var allTags = document.body.getElementsByTagName('*');
var ids = [];

for (var tg = 0; tg< allTags.length; tg++) {
    var tag = allTags[tg];
    if (tag.id) {
            ids.push(tag.id);
     }
}

console.log(ids)


for (let i = 0; i < ids.length; i++) {
  if (ids[i] === 'new-user') {
    newAccount();
  } else if (ids[i] === 'login') {
    login();
  } else if (ids[i] === 'app') {
    app();
  } else if (ids[i] === 'home') {
    home();
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
