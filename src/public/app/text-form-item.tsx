import * as React from 'react';
import { textFormValidation } from '../behavior/validation-test'

interface TextFormStates {
  clicked:boolean;
  submitable:boolean;
  focused:boolean;
  error:boolean;
  submitted:boolean;
  placeholder:string;
  errorMessage:string;
  input:string;
}

class TextForm extends React.Component {
  state:TextFormStates;
  title:string;
  buttonText:string;
  placeholder:string;
  submitted:boolean;
  sendData:Function;

  constructor(props:TextForm) {
    super(props)
    this.state = {
      clicked:false,
      submitable:false,
      focused: false,
      error: false,
      input:'',
      errorMessage:'',
      placeholder:props.placeholder,
      submitted:props.submitted
    };

    this.title =  props.title;
    this.buttonText = props.buttonText;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.submitable = this.submitable.bind(this);
  }

  handleChange(event) {
    let validationAns = textFormValidation(this.title, event.target.value);
    if (!(validationAns === 'OK')) {
      this.setState({
        submitable:false
      })
    }
    this.setState({
      input:event.target.value,
      clicked:true
    })
  }

  handleBlur(event) {
    this.setState({clicked:false})
    let validationAns = textFormValidation(this.title, event.target.value)
    if (validationAns === 'OK') {
      this.setState({
        error:false,
        errorMessage:'',
        submitable:true,
      }, function () {
        this.state.submitable ? this.submitable(true) : this.submitable(false);
      })
    } else if (event.target.value === '') {
      this.setState({
        clicked:false,
        error:false,
        errorMessage:'',
        placeholder:this.state.placeholder
      })

    } else {
      this.setState({
        error:true,
        errorMessage:validationAns
      })
    }
  }

  handleClick(event) {
    this.setState({
      clicked:true,
      focused:true,
      submitted:false,
      placeholder:''
    })
  }

  submitable(bool:boolean) {
    let arr = [this.title, bool]
    this.props.sendData(arr)
  }

  render() {
    return (
      <div>
        <FormTitle
          title = {this.title}
          clicked = {this.state.clicked}
          submitted = {this.submitted} />
        <div>
          <Icon clicked = {this.state.clicked}/>
          <TextInput
            onChange = {this.handleChange}
            onClick = {this.handleClick}
            focused = {this.handleClick}
            blurred = {this.handleBlur}
            clicked = {this.state.clicked}
            placeholder = {this.state.placeholder}
            submitable = {this.state.submitable}
            submitted = {this.submitted}
            error = {this.state.error}
            />
        </div>
        <FormError
          error = {this.state.error}
          errorMessage = {this.state.errorMessage}
          />
      </div>
    )
  }
}

function FormError(props) {
  let currentClass = 'fadeOut';
  if (props.error) {
    currentClass = "textError fadeIn";
  }
  return (
    <div>
      <p className = {currentClass}>
        {props.errorMessage}
      </p>
    </div>
  )
}

function TextInput(props) {
  let currentClass = ''
  if (props.error) {
    currentClass = 'formError'
  }
  if (props.submitted) {
    currentClass = 'formSuccess'
  }
  return (
      <div className = {currentClass}>
        <input
          type = 'text'
          placeholder = {props.placeholder}
          onFocus = {props.test}
          onChange = {props.onChange}
          onClick = {props.onClick}
          onBlur = {props.blurred}
          />
      </div>
    )
}

function FormTitle(props) {
  let currentStyle = '';

  if (props.clicked) {
    currentStyle = "fadeInVert"
  } else if (props.submitted) {
    currentStyle = "fadeOutVert green"
  } else {
    currentStyle = "fadeOutVert"
  }

  return (<h4 className = {currentStyle}>{props.title}</h4>)
}

function Icon(props) {
  // let currentClass = '';
  // if (props.clicked) {
  //     currentClass = 'icon fadeIn'
  // } else {
  //     currentClass = 'icon fadeOut'
  // }
  return (
    <img
      className = {props.clicked ? 'icon fadeIn' : 'icon fadeOut'}
      src = 'https://image.flaticon.com/icons/svg/29/29076.svg'
      />
  )
}

export default TextForm;
