import TextForm from './text-form-item';
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

  constructor(props:FormWrapper) {
    super(props)
    this.state = {
      submitted: false,
      submitable: false
    }
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidation = this.getValidation.bind(this);
    this.testObj = {}
  }

  getValidation(arr:any) {
    for (let k in this.testObj) {
      if (k === arr[0]) {
        console.log(arr[0], 'is already in array')
      }
    }
    let obj = this.testObj;
    obj[arr[0]] = arr[1]
    // console.log(arr, obj)
    // let bool = this.submitCheck()
    // this.setState({
    //   submitable:bool
    // })
  }



  submitCheck() {
    for (let k in this.testObj) {
      if (this.testObj[k] === false) {
        return false
      }
    }
    return true
  }

  // handleSubmit(event) {
  //   if (this.state.submitable && !this.state.error) {
  //     this.setState({
  //       clicked:false,
  //       submitted:true
  //     })
  //   }
  //   event.preventDefault();
  // }

  render() {
    console.log('THIS IS THE FINAL CUT: ',this.state.submitable)
    return (
      <form onSubmit = {this.handleSubmit}>
        <TextForm
          title = 'email'
          placeholder = 'type in your email address'
          sendData = {this.getValidation}
          // submitted = {this.state.submitted}
          />
        <TextForm
          title = 'phone'
          placeholder = 'type in your phone address'
          sendData = {this.getValidation}
          // submitted = {this.state.submitted}
          />
        <SubmitButton
          // submitable = {this.state.submitable}
          // submitted = {this.state.submitted}
          // error = {this.state.error}
          buttonText = 'create account'
          />
      </form>
    )
  }
}

function SubmitButton(props) {
  let currentClass = 'yes'
  if (!props.submitable) {
    currentClass = 'buttonInactive'
  }
  if (props.error) {
     currentClass = 'buttonError'
  }
  if (props.submitted) {
      currentClass = 'buttonSuccess'
  }
  return (
      <button className = {currentClass}>
        {props.buttonText}
      </button>
    )
}



export default FormWrapper;
