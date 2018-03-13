import * as React from 'react';
import scorer from '../behavior/password-strength';
import { textFormValidation } from '../behavior/validation-helpers'

interface TextFormStates {
  firstClick:boolean;
  clicked:boolean;
  submitable:boolean;
  focused:boolean;
  error:boolean;
  submitted:boolean;
  errorMessage:string;
  input:string;
  value:string;
  entropy:number;
}

class PasswordForm extends React.Component {
  state:TextFormStates;
  title:string;
  buttonText:string;
  placeholder:string;
  submitted:boolean;
  sendData:Function;

  constructor(props:PasswordForm) {
    super(props)
    this.state = {
      firstClick:false,
      clicked:false,
      submitable:false,
      focused: false,
      error: false,
      input:'',
      value:'',
      errorMessage:'',
      submitted:props.submitted,
      entropy:0
    };

    this.title =  props.title;
    this.buttonText = props.buttonText;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.submitable = this.submitable.bind(this);
  }

  render() {
    return (
      <div className = 'textFormWrapper'>
        <FormTitle
          title = {this.title}
          firstClick = {this.state.firstClick}
          clicked = {this.state.clicked}
          submitted = {this.props.submitted} />
        <div>
          <Icon clicked = {this.state.clicked}/>
          <TextInput
            firstClick = {this.state.firstClick}
            clicked = {this.state.clicked}
            onClick = {this.handleClick}
            onFocus = {this.handleFocus}
            onChange = {this.handleChange}
            blurred = {this.handleBlur}

            placeholder = {this.props.placeholder}
            submitted = {this.props.submitted}
            error = {this.state.error}
            value = {this.state.value}
            />
        </div>
        <PasswordQuality
          entropy = {this.state.entropy}
          />
        <FormError
          error = {this.state.error}
          errorMessage = {this.state.errorMessage}
          />
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    }, function () {
      console.log(this.state.value)
    })
    let entropy = scorer(event.target.value)
    let validationAns = textFormValidation(this.title, entropy.toString());
    if (!(validationAns === 'OK')) {
      this.setState({
        entropy:entropy,
        submitable:false
      })
    }
    this.setState({
      entropy:entropy,
      input:event.target.value,
      clicked:true
    })
  }

  handleFocus() {
    if (!this.state.firstClick) {
      this.setState({
        firstClick: true,
      });
    }
  }

  handleBlur(event) {
    console.log(this.title, event.target.value)

    this.setState({clicked:false})
    let validationAns = textFormValidation(this.title, this.state.entropy.toString())

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
      })

    } else {
      this.setState({
        error:true,
        errorMessage:validationAns
      }, function () {
        this.state.submitable ? this.submitable(true) : this.submitable(false);
      })
    }
  }

  handleClick(event) {
    this.setState({
      firstClick:true,
      clicked:true,
      focused:true,
      submitted:false,
      placeholder:''
    })
  }

  submitable = (bool:boolean) => {
    let arr = [this.title, bool]
    this.props.sendData(arr)
  }

  componentDidMount() {
    this.submitable(false);
  }
}

class TextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      placeholder:this.props.placeholder,
    }
  }

  render () {
    let currentClass = 'formInactive'

    if (this.props.firstClick) {
      currentClass = ''
    } else if (this.props.error) {
      currentClass = 'formError'
    }
    if (this.props.submitted) {
      currentClass = 'formSuccess'
    }
    return (
      <div className = {currentClass}>
        <input
          type = 'password'
          placeholder = {this.state.placeholder}
          value = {this.props.value}
          onFocus = {this.props.test}
          onChange = {this.props.onChange}
          onClick = {this.props.onClick}
          onBlur = {this.props.blurred}
          onFocus = {this.props.onFocus}
          />
      </div>
    )
  }

}

function PasswordQuality(props) {
  let proportion = convertToProportion(props.entropy, 128)
  let entropyReport = 'fadeOutVert';

  let passIndicator = {
    margin: '0px 0px 0px 50px',
    width: proportion + '%',
    height: '4px',
    background: '#9f2121'
  }
  if (props.entropy > 0 ) {entropyReport = 'fadeInVert'}
  if (props.entropy > 59) {passIndicator.background = '#068721'}

  return (
    <div className = 'passwordQualityWrapper'>
      <div>
        <div style = {passIndicator}></div>
      </div>
      <div>
        <p className = {entropyReport}> entropy: {props.entropy}</p>
      </div>
    </div>
  )
}

function FormError(props) {
  return (
    <div>
      <p className = {props.error ? "textError fadeIn" : 'fadeOut' }>
        {props.errorMessage}
      </p>
    </div>
  )
}



function FormTitle(props) {
  let currentStyle = '';

  if (props.firstClick) {
    currentStyle = "fadeInVert"
  } else {
    currentStyle = "fadeOutVert"
  }

  if (props.submitted)  {currentStyle = 'titleSuccess'}

  return (<h5 className = {currentStyle}>{props.title}</h5>)
}

function Icon(props) {
  return (
    <img
      className = {props.clicked ? 'icon fadeIn' : 'icon fadeIn'}
      src = 'https://image.flaticon.com/icons/svg/26/26053.svg'
      />
  )
}


// HELPER
function convertToProportion(number, max) {
  if (number !== 0) {
    return ((number/max)*100);
  } else {
    return 0;
  }
}

export default PasswordForm;
