(function (React,ReactDOM) {
'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var FormWrapper = (function (_super) {
    __extends(FormWrapper, _super);
    function FormWrapper(props) {
        var _this = this;
        _super.call(this, props);
        this.getData = function (dataFromChild) {
            _this.getValidation(dataFromChild);
        };
        this.state = {
            submitted: false,
            submitable: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getValidation = this.getValidation.bind(this);
        this.testObj = {};
    }
    FormWrapper.prototype.getValidation = function (arr) {
        for (var k in this.testObj) {
            if (k === arr[0]) {
                console.log(arr[0], 'is already in array');
            }
        }
        var obj = this.testObj;
        obj[arr[0]] = arr[1];
        var bool = this.submitCheck();
        this.setState({
            submitable: bool
        });
    };
    FormWrapper.prototype.submitCheck = function () {
        for (var k in this.testObj) {
            if (this.testObj[k] === false) {
                return false;
            }
        }
        return true;
    };
    FormWrapper.prototype.handleSubmit = function (event) {
        if (this.state.submitable) {
            this.setState({
                submitted: true
            });
        }
        event.preventDefault();
    };
    FormWrapper.prototype.render = function () {
        var _this = this;
        var childWithProp = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                sendData: _this.getData,
                submitted: _this.state.submitted
            });
        });
        return (React.createElement("div", {className: 'formWrapper'}, React.createElement("form", {onSubmit: this.handleSubmit}, childWithProp, React.createElement(SubmitButton, {submitable: this.state.submitable, submitted: this.state.submitted, onClick: this.handleSubmit, buttonText: 'create account'}))));
    };
    return FormWrapper;
}(React.Component));
function SubmitButton(props) {
    var currentClass = 'yes';
    if (!props.submitable) {
        currentClass = 'buttonInactive';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", {className: currentClass}, props.buttonText));
}

function emailTest(val) {
    var emailCheck = /^[a-zA-Z0-9\._\$%\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]{2,6}/;
    if (emailCheck.test(val) === true) {
        return "OK";
    }
    else {
        return "That's not a valid email. Try again";
    }
}
function phoneTest(val) {
    var phoneCheck = /^[0-9]+$/;
    if (phoneCheck.test(val) === true) {
        return "OK";
    }
    else {
        return "Somehow you used something other than numbers. It's a phone number, so stick to numbers.";
    }
}
function nameTest(val) {
    var check = /^[a-zA-Z -]+$/;
    if (check.test(val) === true) {
        return "OK";
    }
    else {
        return "Honestly, if this is your name, sorry. This is a very weak regex right now.";
    }
}
function usernameTest(val) {
    var check = /^[a-zA-Z -.]+$/;
    if (check.test(val) === true) {
        return "OK";
    }
    else {
        return "Stick to letters dashes and periods";
    }
}
function passwordTest(val) {
    var entropy = parseInt(val);
    console.log(entropy);
    if (entropy >= 60) {
        return "OK";
    }
    else {
        return "Password is too weak, try adding some legnth.";
    }
}
function passwordduplicateTest(val) {
    var check = /^[a-zA-Z -.]+$/;
    if (check.test(val) === true) {
        return "OK";
    }
    else {
        return "Must match the password above.";
    }
}
function textFormValidation(type, val) {
    if (type === 'email') {
        return emailTest(val);
    }
    else if (type === 'phone') {
        return phoneTest(val);
    }
    else if (type === 'name') {
        return nameTest(val);
    }
    else if (type === 'username') {
        return usernameTest(val);
    }
    else if (type === 'password') {
        return passwordTest(val);
    }
    else if (type === 'passwordduplicate') {
        return passwordduplicateTest(val);
    }
    else {
        return 'this code is broken';
    }
}

var TextForm = (function (_super) {
    __extends(TextForm, _super);
    function TextForm(props) {
        var _this = this;
        _super.call(this, props);
        this.submitable = function (bool) {
            var arr = [_this.title, bool];
            _this.props.sendData(arr);
        };
        this.state = {
            firstClick: false,
            clicked: false,
            submitable: false,
            focused: false,
            error: false,
            input: '',
            value: '',
            errorMessage: '',
            submitted: props.submitted,
        };
        this.title = props.title;
        this.buttonText = props.buttonText;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.submitable = this.submitable.bind(this);
    }
    TextForm.prototype.render = function () {
        return (React.createElement("div", {className: 'textFormWrapper'}, React.createElement(FormTitle, {title: this.title, firstClick: this.state.firstClick, clicked: this.state.clicked, submitted: this.props.submitted}), React.createElement("div", null, React.createElement(Icon, {clicked: this.state.clicked}), React.createElement(TextInput, {firstClick: this.state.firstClick, clicked: this.state.clicked, onClick: this.handleClick, onFocus: this.handleFocus, onChange: this.handleChange, blurred: this.handleBlur, placeholder: this.props.placeholder, submitted: this.props.submitted, error: this.state.error, value: this.state.value})), React.createElement(FormError, {error: this.state.error, errorMessage: this.state.errorMessage})));
    };
    TextForm.prototype.handleChange = function (event) {
        this.setState({
            value: event.target.value
        }, function () {
            console.log(this.state.value);
        });
        var validationAns = textFormValidation(this.title, event.target.value);
        if (!(validationAns === 'OK')) {
            this.setState({
                submitable: false
            });
        }
        this.setState({
            input: event.target.value,
            clicked: true
        });
    };
    TextForm.prototype.handleFocus = function () {
        console.log('sup');
        if (!this.state.firstClick) {
            this.setState({
                firstClick: true,
            });
        }
    };
    TextForm.prototype.handleBlur = function (event) {
        console.log(this.title, event.target.value);
        this.setState({ clicked: false });
        var validationAns = textFormValidation(this.title, event.target.value);
        if (validationAns === 'OK') {
            this.setState({
                error: false,
                errorMessage: '',
                submitable: true,
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
        else if (event.target.value === '') {
            this.setState({
                clicked: false,
                error: false,
                errorMessage: '',
            });
        }
        else {
            this.setState({
                error: true,
                errorMessage: validationAns
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
    };
    TextForm.prototype.handleClick = function (event) {
        this.setState({
            firstClick: true,
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    TextForm.prototype.componentDidMount = function () {
        this.submitable(false);
    };
    return TextForm;
}(React.Component));
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        _super.call(this, props);
        this.state = {
            placeholder: this.props.placeholder,
        };
    }
    TextInput.prototype.render = function () {
        var currentClass = 'formInactive';
        if (this.props.firstClick) {
            currentClass = '';
        }
        else if (this.props.error) {
            currentClass = 'formError';
        }
        if (this.props.submitted) {
            currentClass = 'formSuccess';
        }
        return (React.createElement("div", {className: currentClass}, React.createElement("input", {type: 'text', placeholder: this.state.placeholder, value: this.props.value, onFocus: this.props.test, onChange: this.props.onChange, onClick: this.props.onClick, onBlur: this.props.blurred, onFocus: this.props.onFocus})));
    };
    return TextInput;
}(React.Component));
function FormError(props) {
    return (React.createElement("div", null, React.createElement("p", {className: props.error ? "textError fadeIn" : 'fadeOut'}, props.errorMessage)));
}
function FormTitle(props) {
    var currentStyle = '';
    if (props.firstClick) {
        currentStyle = "fadeInVert";
    }
    else {
        currentStyle = "fadeOutVert";
    }
    if (props.submitted) {
        currentStyle = 'titleSuccess';
    }
    return (React.createElement("h5", {className: currentStyle}, props.title));
}
function Icon(props) {
    return (React.createElement("img", {className: props.clicked ? 'icon fadeIn' : 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/29/29076.svg'}));
}

function cardinalityGuess(password) {
    var cardinality = 0;
    var lowerCase = /[a-z]/, upperCase = /[A-Z]/, numbers = /\d/, symbols = /[`~!@#$%^&*()\-_=+\[\]\\\{\};"':,<\.>\/?|]/;
    if (password.match(lowerCase)) {
        cardinality = cardinality + 26;
        console.log('positive lowercase search', 'cardinality', cardinality);
    }
    if (password.match(upperCase)) {
        cardinality = cardinality + 26;
        console.log('positive uppercase search', 'cardinality', cardinality);
    }
    if (password.match(numbers)) {
        cardinality = cardinality + 10;
        console.log('positive number search', 'cardinality', cardinality);
    }
    if (password.match(symbols)) {
        cardinality = cardinality + 33;
        console.log('positive symbol search', 'cardinality', cardinality, password.search(symbols));
    }
    return cardinality;
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
//simple brute-force scorer
function scorer(password) {
    if (password.length === 0) {
        return 0;
    }
    var cardinality = cardinalityGuess(password);
    var symbolOptions = Math.pow(cardinality, password.length);
    var entropy = password.length * (Math.log2(cardinality));
    return round(entropy, 2);
}
// password strength checker
// CHANGE TO JUST VAR
var form = $('#password');
var passIndicator = $('#passIndicator');
var passScorer = $('#passScorer > p');
form.keyup(function () {
    console.log('running');
    var entropy = scorer($(this).val());
    var length = $(this).val().length;
    passIndicator.addClass('passIndicator');
    if (length === 0) {
        form.removeClass('passing');
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator');
        passScorer.text("No password");
    }
    else if (entropy > 0 && entropy < 28) {
        form.removeClass('passing');
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator').addClass('veryWeak');
        passScorer.text(entropy + " bits of entropy.  Very Weak; might keep out family members");
    }
    else if (entropy >= 28 && entropy < 36) {
        form.removeClass('passing');
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator').addClass('weak');
        passScorer.text(entropy + " bits of entropy. Weak; should keep out most people, often good for desktop login passwords.");
    }
    else if (entropy >= 36 && entropy < 60) {
        form.removeClass('passing');
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator').addClass('reasonable');
        passScorer.text(entropy + " bits of entropy. Reasonable; fairly secure passwords for network and company passwords");
    }
    else if (entropy >= 60 && entropy < 128) {
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator').addClass('strong');
        form.addClass('passing');
        passScorer.text(entropy + " bits of entropy. Strong; can be good for guarding financial information");
    }
    else if (entropy >= 128) {
        passIndicator.removeClass();
        passIndicator.addClass('passIndicator').addClass('overkill');
        form.addClass('passing');
        passScorer.text(entropy + " bits of entropy. Strong; often overkill");
    }
});

var PasswordForm = (function (_super) {
    __extends(PasswordForm, _super);
    function PasswordForm(props) {
        var _this = this;
        _super.call(this, props);
        this.submitable = function (bool) {
            var arr = [_this.title, bool];
            _this.props.sendData(arr);
        };
        this.state = {
            firstClick: false,
            clicked: false,
            submitable: false,
            focused: false,
            error: false,
            input: '',
            value: '',
            errorMessage: '',
            submitted: props.submitted,
            entropy: 0
        };
        this.title = props.title;
        this.buttonText = props.buttonText;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.submitable = this.submitable.bind(this);
    }
    PasswordForm.prototype.render = function () {
        return (React.createElement("div", {className: 'textFormWrapper'}, React.createElement(FormTitle$1, {title: this.title, firstClick: this.state.firstClick, clicked: this.state.clicked, submitted: this.props.submitted}), React.createElement("div", null, React.createElement(Icon$1, {clicked: this.state.clicked}), React.createElement(TextInput$1, {firstClick: this.state.firstClick, clicked: this.state.clicked, onClick: this.handleClick, onFocus: this.handleFocus, onChange: this.handleChange, blurred: this.handleBlur, placeholder: this.props.placeholder, submitted: this.props.submitted, error: this.state.error, value: this.state.value})), React.createElement(PasswordQuality, {entropy: this.state.entropy}), React.createElement(FormError$1, {error: this.state.error, errorMessage: this.state.errorMessage})));
    };
    PasswordForm.prototype.handleChange = function (event) {
        this.setState({
            value: event.target.value
        }, function () {
            console.log(this.state.value);
        });
        var entropy = scorer(event.target.value);
        var validationAns = textFormValidation(this.title, entropy.toString());
        if (!(validationAns === 'OK')) {
            this.setState({
                entropy: entropy,
                submitable: false
            });
        }
        this.setState({
            entropy: entropy,
            input: event.target.value,
            clicked: true
        });
    };
    PasswordForm.prototype.handleFocus = function () {
        if (!this.state.firstClick) {
            this.setState({
                firstClick: true,
            });
        }
    };
    PasswordForm.prototype.handleBlur = function (event) {
        console.log(this.title, event.target.value);
        this.setState({ clicked: false });
        var validationAns = textFormValidation(this.title, this.state.entropy.toString());
        if (validationAns === 'OK') {
            this.setState({
                error: false,
                errorMessage: '',
                submitable: true,
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
        else if (event.target.value === '') {
            this.setState({
                clicked: false,
                error: false,
                errorMessage: '',
            });
        }
        else {
            this.setState({
                error: true,
                errorMessage: validationAns
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
    };
    PasswordForm.prototype.handleClick = function (event) {
        this.setState({
            firstClick: true,
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    PasswordForm.prototype.componentDidMount = function () {
        this.submitable(false);
    };
    return PasswordForm;
}(React.Component));
var TextInput$1 = (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        _super.call(this, props);
        this.state = {
            placeholder: this.props.placeholder,
        };
    }
    TextInput.prototype.render = function () {
        var currentClass = 'formInactive';
        if (this.props.firstClick) {
            currentClass = '';
        }
        else if (this.props.error) {
            currentClass = 'formError';
        }
        if (this.props.submitted) {
            currentClass = 'formSuccess';
        }
        return (React.createElement("div", {className: currentClass}, React.createElement("input", {type: 'password', placeholder: this.state.placeholder, value: this.props.value, onFocus: this.props.test, onChange: this.props.onChange, onClick: this.props.onClick, onBlur: this.props.blurred, onFocus: this.props.onFocus})));
    };
    return TextInput;
}(React.Component));
function PasswordQuality(props) {
    var proportion = convertToProportion(props.entropy, 128);
    var entropyReport = 'fadeOutVert';
    var passIndicator = {
        margin: '0px 0px 0px 50px',
        width: proportion + '%',
        height: '4px',
        background: '#9f2121'
    };
    if (props.entropy > 0) {
        entropyReport = 'fadeInVert';
    }
    if (props.entropy > 59) {
        passIndicator.background = '#068721';
    }
    return (React.createElement("div", {className: 'passwordQualityWrapper'}, React.createElement("div", null, React.createElement("div", {style: passIndicator})), React.createElement("div", null, React.createElement("p", {className: entropyReport}, " entropy: ", props.entropy))));
}
function FormError$1(props) {
    return (React.createElement("div", null, React.createElement("p", {className: props.error ? "textError fadeIn" : 'fadeOut'}, props.errorMessage)));
}
function FormTitle$1(props) {
    var currentStyle = '';
    if (props.firstClick) {
        currentStyle = "fadeInVert";
    }
    else {
        currentStyle = "fadeOutVert";
    }
    if (props.submitted) {
        currentStyle = 'titleSuccess';
    }
    return (React.createElement("h5", {className: currentStyle}, props.title));
}
function Icon$1(props) {
    return (React.createElement("img", {className: props.clicked ? 'icon fadeIn' : 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/26/26053.svg'}));
}
// HELPER
function convertToProportion(number, max) {
    if (number !== 0) {
        return ((number / max) * 100);
    }
    else {
        return 0;
    }
}

ReactDOM.render(React.createElement(FormWrapper, null, React.createElement(TextForm, {title: 'username', placeholder: 'type in your username'}), React.createElement(TextForm, {title: 'email', placeholder: 'type in your email'}), React.createElement(PasswordForm, {title: 'password', placeholder: 'type in your password'})), document.getElementById('root'));

}(React,ReactDOM));
//# sourceMappingURL=bundle.js.map
