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
import PropTypes from 'prop-types';
import * as React from 'react';
import reactRedux, { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom'

// Based on: https://github.com/vaibhavmule/react-redux-helloworld/

// Actions
const HELLO_WORLD = 'HELLO_WORLD'

const helloAction = () => {
  console.log('helloWorld action')
  return {
    type: HELLO_WORLD
  }
}

// Components
class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HelloWorld />
    )
  }
}

const Hello = ({ onClick, message }) => {
  return (
    <div>
      <h1>{ message }</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

Hello.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}

// Container
const mapStateToProps = (state, ownProps) => {
  return {
    message: state.helloWorld.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(helloAction())
    }
  }
}

const HelloWorld = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)

// Reducers
const helloWorldReducer = (state = { message: 'Hello' }, action) => {
  switch (action.type) {
    case HELLO_WORLD:
      console.log('reducer: helloWorld')
      return Object.assign({}, state, { message: 'Hello, World!' })
    default:
      return state
  }
}

const helloReducer = combineReducers({
  helloWorld: helloWorldReducer
})

// Index
let store = createStore(helloReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('login')
)
