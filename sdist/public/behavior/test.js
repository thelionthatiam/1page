class TextForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            clicked: false,
            submitted: false,
            focused: false,
            error: false,
            placeholder: 'a de facto title'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleSubmit(event) {
        this.setState({
            clicked: false,
            submitted: true
        });
        event.preventDefault();
    }
    handleChange(event) {
        // input validation logic
        this.setState({
            input: event.target.value,
            clicked: true
        });
    }
    handleClick(event) {
        this.setState({
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    }
    render() {
        console.log(this.props);
        return (React.createElement("div", { className: 'TextFormWrapper' },
            React.createElement(FormTitle, { title: this.props.title, clicked: this.state.clicked, submitted: this.state.submitted }),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", null,
                    React.createElement(Icon, { clicked: this.state.clicked }),
                    React.createElement(TextInput, { onChange: this.handleChange, onClick: this.handleClick, focused: this.handleClick, clicked: this.state.clicked, placeholder: this.state.placeholder, submitted: this.state.submitted, error: this.state.error })),
                React.createElement(FormError, { error: this.state.error }),
                React.createElement(SubmitButton, { submitted: this.state.submitted, error: this.state.error }))));
    }
}
function FormError(props) {
    if (props.error) {
        return (React.createElement("div", null,
            React.createElement("p", { className: "textError" }, "this is error text")));
    }
    return (React.createElement("div", null));
}
function SubmitButton(props) {
    let currentClass = 'yes';
    if (props.error) {
        currentClass = 'buttonError';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", { className: currentClass }, "submit"));
}
//
function TextInput(props) {
    let currentClass = '';
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
    let currentStyle = '';
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
ReactDOM.render(React.createElement(TextForm, { title: 'test' }), document.getElementById('root'));
//# sourceMappingURL=test.js.map