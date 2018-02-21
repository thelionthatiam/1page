var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var TextForm = /** @class */ (function (_super) {
    __extends(TextForm, _super);
    function TextForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            input: '',
            clicked: false,
            submitted: false,
            focused: false,
            error: false,
            placeholder: props.placeholder,
            title: props.title
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    TextForm.prototype.handleSubmit = function (event) {
        this.setState({
            clicked: false,
            submitted: true
        });
        event.preventDefault();
    };
    TextForm.prototype.handleChange = function (event) {
        // input validation logic
        this.setState({
            input: event.target.value,
            clicked: true
        });
    };
    TextForm.prototype.handleClick = function (event) {
        this.setState({
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    TextForm.prototype.render = function () {
        return (React.createElement("div", { className: 'TextFormWrapper' },
            React.createElement(FormTitle, { title: this.state.title, clicked: this.state.clicked, submitted: this.state.submitted }),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", null,
                    React.createElement(Icon, { clicked: this.state.clicked }),
                    React.createElement(TextInput, { onChange: this.handleChange, onClick: this.handleClick, focused: this.handleClick, clicked: this.state.clicked, placeholder: this.state.placeholder, submitted: this.state.submitted, error: this.state.error })),
                React.createElement(FormError, { error: this.state.error }),
                React.createElement(SubmitButton, { submitted: this.state.submitted, error: this.state.error }))));
    };
    return TextForm;
}(React.Component));
function FormError(props) {
    if (props.error) {
        return (React.createElement("div", null,
            React.createElement("p", { className: "textError" }, "this is error text")));
    }
    return (React.createElement("div", null));
}
function SubmitButton(props) {
    var currentClass = 'yes';
    if (props.error) {
        currentClass = 'buttonError';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", { className: currentClass }, "woohoo"));
}
function TextInput(props) {
    var currentClass = '';
    if (props.error) {
        currentClass = 'formError';
    }
    if (props.submitted) {
        currentClass = 'formSuccess';
    }
    return (React.createElement("div", { className: currentClass },
        React.createElement("input", { type: 'text', placeholder: props.placeholder, onFocus: props.test, onChange: props.onChange, onClick: props.onClick })));
}
function FormTitle(props) {
    var currentStyle = '';
    if (props.clicked) {
        currentStyle = "fadeInVert";
    }
    else if (props.submitted) {
        currentStyle = "fadeOutVert green";
    }
    else {
        currentStyle = "fadeOutVert";
    }
    return (React.createElement("h4", { className: currentStyle }, props.title));
}
function Icon(props) {
    if (props.clicked) {
        return (React.createElement("img", { className: 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/29/29076.svg' }));
    }
    else {
        return (React.createElement("img", { className: 'icon fadeOut', src: 'https://image.flaticon.com/icons/svg/29/29076.svg' }));
    }
}
export default TextForm;
//# sourceMappingURL=test.js.map