import TextForm from './form-item-text';
import Button from './button-generic'
import * as React from 'react';

interface FormWrapperStates {
  submitable:any;
  submitted:boolean;
  clicked:boolean;
}

class FormWrapper extends React.Component {
  states:FormWrapperStates;
  formItems:any;
  testObj:any;
  action:any;
  buttonText:string;

  constructor(props:FormWrapper) {
    super(props)
    this.state = {
      submitted: false,
      submitable: false,
      data: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidation = this.getValidation.bind(this);
    this.testObj = {}
  }

  getValidation(arr) {
    for (let k in this.testObj) {
      if (k === arr[0]) {
        console.log(arr[0], 'is already in array')
      }
    }
    let obj = this.testObj;
    obj[arr[0]] = arr[1]
    let bool = this.submitCheck()
    this.setState({
      submitable:bool
    })
  }
  // CHANGE DATA SENDING TO OBJ RATHER THAN ARRAY
  getData = (dataFromChild) => {
    let data = this.state.data
    let title = dataFromChild[0]
    let value = dataFromChild[2]
    data[title] = value
    console.log(data)
    console.log(dataFromChild)
    this.setState({
      data:data
    })
    this.getValidation(dataFromChild)
  }

  submitCheck() {
    for (let k in this.testObj) {
      if (this.testObj[k] === false) {
        return false
      }
    }
    return true
  }

  handleSubmit(event) {
    console.log(this.props.url)
    fetch(this.props.url, {
        body:JSON.stringify(this.state.data),
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
    if (this.state.submitable) {
      fetch(this.props.url, {
          body:JSON.stringify(this.state.data),
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
        .then((res) => {
          return (res.json())
        })
        .then(body => console.log(body))
        .then(
          this.setState({
            submitted:true
          })
        )
        .catch((error) => {
            console.log(error)
          })


    }
    event.preventDefault();
  }

  render() {
    const childWithProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
          sendData: this.getData,
          submitted: this.state.submitted
        });
    });

    return (

        <div className ='formWrapper'>
          <form onSubmit = {this.handleSubmit}>
            {childWithProp}
            <Button
              submitable = {this.state.submitable}
              submitted = {this.state.submitted}
              onClick = {this.handleSubmit}
              buttonText = {this.props.buttonText}
              />
          </form>
        </div>

    )
  }
}




export default FormWrapper;
