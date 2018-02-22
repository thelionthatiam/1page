"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var text_form_item_1 = require("./text-form-item");
var React = require("react");
var FormWrapper = /** @class */ (function (_super) {
    __extends(FormWrapper, _super);
    function FormWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            submitted: false,
            submitable: false
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        _this.getValidation = _this.getValidation.bind(_this);
        _this.testObj = {};
        return _this;
    }
    FormWrapper.prototype.getValidation = function (arr) {
        for (var k in this.testObj) {
            if (k === arr[0]) {
                console.log(arr[0], 'is already in array');
            }
        }
        var obj = this.testObj;
        obj[arr[0]] = arr[1];
        // console.log(arr, obj)
        // let bool = this.submitCheck()
        // this.setState({
        //   submitable:bool
        // })
    };
    FormWrapper.prototype.submitCheck = function () {
        for (var k in this.testObj) {
            if (this.testObj[k] === false) {
                return false;
            }
        }
        return true;
    };
    // handleSubmit(event) {
    //   if (this.state.submitable && !this.state.error) {
    //     this.setState({
    //       clicked:false,
    //       submitted:true
    //     })
    //   }
    //   event.preventDefault();
    // }
    FormWrapper.prototype.render = function () {
        console.log('THIS IS THE FINAL CUT: ', this.state.submitable);
        return (React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement(text_form_item_1.default, { title: 'email', placeholder: 'type in your email address', sendData: this.getValidation }),
            React.createElement(text_form_item_1.default, { title: 'phone', placeholder: 'type in your phone address', sendData: this.getValidation }),
            React.createElement(SubmitButton
            // submitable = {this.state.submitable}
            // submitted = {this.state.submitted}
            // error = {this.state.error}
            , { 
                // submitable = {this.state.submitable}
                // submitted = {this.state.submitted}
                // error = {this.state.error}
                buttonText: 'create account' })));
    };
    return FormWrapper;
}(React.Component));
function SubmitButton(props) {
    var currentClass = 'yes';
    if (!props.submitable) {
        currentClass = 'buttonInactive';
    }
    if (props.error) {
        currentClass = 'buttonError';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", { className: currentClass }, props.buttonText));
}
exports.default = FormWrapper;
//# sourceMappingURL=test-form-wrapper.js.map