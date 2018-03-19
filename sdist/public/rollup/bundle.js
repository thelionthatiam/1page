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
            // CHANGE DATA SENDING TO OBJ RATHER THAN ARRAY
            this.getData = function (dataFromChild) {
                var data = _this.state.data;
                var title = dataFromChild[0];
                var value = dataFromChild[2];
                data[title] = value;
                _this.setState({
                    data: data
                });
                _this.getValidation(dataFromChild);
            };
            this.state = {
                submitted: false,
                submitable: false,
                data: {}
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
            console.log('HANDLE SUBMIT CALLED');
            event.stopPropagation();
            event.preventDefault();
            if (this.state.submitable && this.props.method === 'post') {
                var dummyString = JSON.stringify(this.state.data);
                console.log('test string: ', dummyString);
                fetch(this.props.url, {
                    body: dummyString,
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                })
                    .then(function (res) { return res.json(); })
                    .then(function (body) { return console.log(body); })
                    .then(this.setState({
                    submitted: true
                }))
                    .catch(function (error) {
                    console.log(error.stack);
                });
            }
            else if (this.state.submitable && this.props.method === 'get') {
                fetch(this.props.url, {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
            }
            else {
                console.log('some validation required before sending!');
            }
            this.props.noValidation ? console.log('no validation req') : event.preventDefault();
        };
        FormWrapper.prototype.skipValidation = function () {
            this.setState({
                submitable: true
            });
        };
        FormWrapper.prototype.componentDidMount = function () {
            this.props.noValidation ? this.skipValidation() : console.log('validation required');
        };
        FormWrapper.prototype.render = function () {
            var _this = this;
            var childWithProp = React.Children.map(this.props.children, function (child) {
                return React.cloneElement(child, {
                    sendData: _this.getData,
                    submitted: _this.state.submitted
                });
            });
            return (React.createElement("div", {className: 'formWrapper'}, React.createElement("form", {onSubmit: this.handleSubmit, action: this.props.url, method: this.props.method}, childWithProp, React.createElement("input", {type: 'submit'}))));
        };
        return FormWrapper;
    }(React.Component));

    var PasswordQuality = (function (_super) {
        __extends(PasswordQuality, _super);
        function PasswordQuality(props) {
            _super.call(this, props);
            this.state = {
                showPass: false
            };
        }
        PasswordQuality.prototype.render = function () {
            var proportion = convertToProportion(this.props.entropy, 128);
            var entropyReport;
            var passIndicator = {
                width: proportion + '%',
                height: '4px',
                background: '#9f2121',
                transition: '300ms',
                maxWidth: '100%'
            };
            if (this.props.entropy > 0) {
                entropyReport = React.createElement("p", {className: 'fadeIn textError marginPaddingFix'}, " ", "Not strong enough. Entropy: " + this.props.entropy, " ");
            }
            if (this.props.entropy > 59) {
                passIndicator.background = '#068721';
                entropyReport = React.createElement("p", {className: 'fadeIn textSuccess marginPaddingFix'}, " ", "This should be strong enough. Entropy: " + this.props.entropy, " ");
            }
            if (this.props.newPass) {
                return (React.createElement("div", null, React.createElement("div", {className: 'passwordQualityWrapper'}, React.createElement("div", {style: passIndicator}), entropyReport)));
            }
            else {
                return null;
            }
        };
        return PasswordQuality;
    }(React.Component));
    // HELPER
    function convertToProportion(number, max) {
        if (number !== 0) {
            return ((number / max) * 100);
        }
        else {
            return 0;
        }
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

    function emailTest(val) {
        var emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            return "Stick to letters dashes and periods.";
        }
    }
    function passwordTest(val) {
        var entropy = parseInt(val);
        if (entropy >= 60) {
            return "OK";
        }
        else {
            return "Password is too weak, try adding some length.";
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
        else if (type === 'noValidation') {
            console.log('def only');
            return "OK";
        }
        else {
            return 'this code is broken';
        }
    }

    var FormItem = (function (_super) {
        __extends(FormItem, _super);
        function FormItem(props) {
            var _this = this;
            _super.call(this, props);
            this.submitable = function (bool) {
                var arr = [_this.title, bool, _this.state.value];
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
        FormItem.prototype.render = function () {
            return (React.createElement("div", {className: 'textFormWrapper'}, React.createElement(FormTitle, {title: this.title, firstClick: this.state.firstClick, clicked: this.state.clicked, submitted: this.props.submitted}), React.createElement("div", null, React.createElement(FormIcon, {clicked: this.state.clicked, imgSrc: this.props.imgSrc}), React.createElement(TextInput, {firstClick: this.state.firstClick, clicked: this.state.clicked, onClick: this.handleClick, onFocus: this.handleFocus, onChange: this.handleChange, blurred: this.handleBlur, placeholder: this.props.placeholder, submitted: this.props.submitted, error: this.state.error, value: this.state.value, type: this.props.type})), this.props.type === 'password' ? React.createElement(PasswordQuality, {entropy: this.state.entropy, newPass: this.props.newPass, type: this.props.type}) : React.createElement(PasswordQuality, null), React.createElement(FormError, {error: this.state.error, errorMessage: this.state.errorMessage})));
        };
        FormItem.prototype.handleChange = function (event) {
            if (this.props.type === 'password') {
                this.setState({
                    value: event.target.value
                });
                var entropy = scorer(event.target.value);
                var validationAns = textFormValidation(this.title, entropy.toString());
                if (!(validationAns === 'OK')) {
                    this.setState({
                        entropy: entropy,
                        submitable: false
                    }, function () {
                        this.state.submitable ? this.submitable(true) : this.submitable(false);
                    });
                }
                else {
                    this.setState({
                        submitable: true
                    }, function () {
                        this.state.submitable ? this.submitable(true) : this.submitable(false);
                    });
                }
                this.setState({
                    entropy: entropy,
                    input: event.target.value,
                    clicked: true
                });
            }
            else {
                var checkValue = event.target.value;
                var entropy = scorer(this.state.value);
                console.log(this.title, event.target.value, entropy);
                if (this.props.type === 'password') {
                    checkValue = entropy.toString();
                }
                this.setState({
                    value: event.target.value,
                    clicked: true
                }, function () {
                    console.log(this.title, this.state.value);
                });
                var validationAns = textFormValidation(this.title, checkValue);
                if (validationAns === 'OK') {
                    this.setState({
                        error: false,
                        errorMessage: '',
                        submitable: true,
                        entropy: entropy
                    }, function () {
                        this.state.submitable ? this.submitable(true) : this.submitable(false);
                    });
                }
                else if (event.target.value === '') {
                    this.setState({
                        clicked: false,
                        error: false,
                        errorMessage: '',
                        submitable: false,
                        entropy: 0
                    }, function () {
                        this.state.submitable ? this.submitable(true) : this.submitable(false);
                    });
                }
                else {
                    this.setState({
                        error: true,
                        submitable: false,
                        entropy: entropy
                    }, function () {
                        this.state.submitable ? this.submitable(true) : this.submitable(false);
                    });
                }
                this.setState({
                    entropy: entropy,
                    input: event.target.value,
                    clicked: true
                });
            }
        };
        FormItem.prototype.handleFocus = function () {
            if (!this.state.firstClick) {
                this.setState({
                    firstClick: true,
                });
            }
        };
        FormItem.prototype.handleBlur = function (event) {
            var checkValue = event.target.value;
            var entropy = scorer(this.state.value);
            if (this.props.type === 'password') {
                checkValue = entropy.toString();
            }
            this.setState({ clicked: false });
            var validationAns = textFormValidation(this.title, checkValue);
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
        FormItem.prototype.handleClick = function (event) {
            this.setState({
                firstClick: true,
                clicked: true,
                focused: true,
                submitted: false,
                placeholder: ''
            });
        };
        FormItem.prototype.componentDidMount = function () {
            this.submitable(false);
        };
        return FormItem;
    }(React.Component));
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput(props) {
            _super.call(this, props);
            this.state = {
                placeholder: this.props.placeholder,
                showPass: false
            };
            this.handleClick = this.handleClick.bind(this);
        }
        TextInput.prototype.handleClick = function (event) {
            if (this.state.showPass) {
                this.setState({
                    showPass: false
                });
            }
            else {
                this.setState({
                    showPass: true
                });
            }
            event.preventDefault();
        };
        TextInput.prototype.render = function () {
            var currentClass = 'formInactive inputWrapper';
            var eye;
            var password;
            if (this.props.firstClick) {
                currentClass = '';
            }
            else if (this.props.error) {
                currentClass = 'formError inputWrapper';
            }
            if (this.props.submitted) {
                currentClass = 'formSuccess inputWrapper';
            }
            if (this.props.type === 'password') {
                if (this.state.showPass) {
                    eye = React.createElement("img", {src: '/icons/eye-no.svg', className: 'icon fadeIn', onClick: this.handleClick});
                    password = React.createElement("p", {className: 'showPass marginPaddingFix'}, this.props.value);
                }
                else {
                    eye = React.createElement("img", {src: '/icons/eye.svg', className: 'icon fadeIn', onClick: this.handleClick});
                    password = React.createElement("p", {className: 'hidePass marginPaddingFix'});
                }
            }
            return (React.createElement("div", {className: currentClass}, React.createElement("input", {placeholder: this.state.placeholder, value: this.props.value, onChange: this.props.onChange, onClick: this.props.onClick, onBlur: this.props.blurred, onFocus: this.props.onFocus, type: this.props.type}), password, eye));
        };
        return TextInput;
    }(React.Component));
    function FormError(props) {
        return (React.createElement("div", null, React.createElement("p", {className: props.error ? "textError fadeIn" : 'fadeOut'}, props.errorMessage)));
    }
    function FormTitle(props) {
        var currentStyle = '';
        props.firstClick ? currentStyle = "fadeInVert" : currentStyle = "fadeOutVert";
        if (props.submitted) {
            currentStyle = 'titleSuccess';
        }
        return (React.createElement("h5", {className: currentStyle}, props.title));
    }
    function FormIcon(props) {
        return (React.createElement("img", {className: 'formIcon fadeIn', src: props.imgSrc}));
    }

    function newAccount() {
        return ReactDOM.render(React.createElement("div", {className: "flex pageWrapper"}, React.createElement("div", {className: "flex column userWrapper"}, React.createElement("h3", {className: "formTitle"}, "create account"), React.createElement(FormWrapper, {buttonText: 'create new account', url: 'http://localhost:8000/accounts', method: 'post'}, React.createElement(FormItem, {title: 'name', placeholder: 'type in your username', imgSrc: '/icons/user-fem.svg'}), React.createElement(FormItem, {title: 'email', placeholder: 'type in your email', imgSrc: '/icons/mail.svg'}), React.createElement(FormItem, {title: 'phone', placeholder: 'type in your phone number', imgSrc: '/icons/phone.svg'}), React.createElement(FormItem, {title: 'password', placeholder: 'type in your password', imgSrc: '/icons/key.svg', type: 'password', newPass: true})), React.createElement(FormWrapper, {buttonText: 'login', method: 'get', url: 'http://localhost:8000/', noValidation: true}))), document.getElementById('new-user'));
    }

    function login() {
        console.log('login executed');
        return ReactDOM.render(React.createElement("div", {className: "flex column userWrapper login"}, React.createElement("h3", {className: "formTitle"}, "login"), React.createElement(FormWrapper, {buttonText: 'login', url: 'http://localhost:8000/api/authorized', noValidation: true, method: 'post'}, React.createElement(FormItem, {title: 'email', placeholder: 'type in your email', imgSrc: '/icons/mail.svg'}), React.createElement(FormItem, {title: 'password', placeholder: 'type in your password', imgSrc: '/icons/key.svg', type: 'password', newPass: false})), React.createElement(FormWrapper, {buttonText: 'home', url: 'http://localhost:8000/home-redirect', noValidation: true, method: 'get'}), React.createElement(FormWrapper, {buttonText: 'create new account', url: 'http://localhost:8000/new-account', noValidation: true, method: 'get'}), React.createElement("div", {className: "flex column userWrapper"}, React.createElement("form", {action: "/forgot-password", method: "get"}, React.createElement("button", {className: "no", type: "submit"}, "forgot password")), React.createElement("form", {method: 'get', action: '/splash'}, React.createElement("button", {type: 'submit', className: 'no'}, "splash page")))), document.getElementById('login'));
    }

    var allTags = document.body.getElementsByTagName('*');
    var ids = [];
    for (var tg = 0; tg < allTags.length; tg++) {
        var tag = allTags[tg];
        if (tag.id) {
            ids.push(tag.id);
        }
    }
    console.log(ids);
    for (var i = 0; i < ids.length; i++) {
        console.log(ids[i]);
        if (ids[i] === 'new-user') {
            newAccount();
        }
        else if (ids[i] === 'login') {
            login();
        }
    }

}(React,ReactDOM));
//# sourceMappingURL=bundle.js.map
