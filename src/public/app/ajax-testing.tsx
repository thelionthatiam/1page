import * as React from 'react';
import axios from 'axios'
import fetch from 'node-fetch';


class PersonList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      increment:0,
      persons: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  fetcher(count) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        console.log(json[count])
        if (count === 0) {
          console.log('count is 0')
          this.setState({
            persons:[json[count]],
            increment:(count + 1)
          })
        } else {
          console.log('count is non0')
          let currentPeople = this.state.persons;
          currentPeople.push(json[count])
           this.setState({
             persons:currentPeople,
             increment:(count + 1)
           })
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetcher(0)
  }

  handleClick() {
    this.fetcher(this.state.increment)
  }

  render() {
    console.log('increment', this.state.increment)
    return (
      <div>
        <Button
          onClick = {this.handleClick}
        />
        <ul>
          { this.state.persons.map(person => {
            return <li>{person.name + '--aka--' + person.username}</li>
          })}
        </ul>
      </div>
    )
  }
}

function Button(props) {
  return (
    <button onClick = {props.onClick}>add a user</button>
  )
}




export default PersonList;
