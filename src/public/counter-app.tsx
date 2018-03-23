import React, { Component } from 'react';
import HelloWorld from '../containers/HelloWorld'
import { createStore } from 'redux'
import Counter from '../components/counter'
import counter from '../reducers/counter' 

export const store = createStore(counter)

class App extends Component {
  
  render() {
    return (
      <div>
        <HelloWorld />
        <Counter
          value = { store.getState() }
          onIncrement = { () => store.dispatch({type: 'INCRIMENT'}) }
          onDecrement = { () => store.dispatch({type: 'DECREMENT'}) }
        />
      </div>
    );
  }
}

export default App;
