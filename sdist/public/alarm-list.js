"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Transition_1 = require("react-transition-group/Transition");
const toggle_1 = require("./little-components/toggle");
const nothing_here_1 = require("./little-components/nothing-here");
class AlarmList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let alarms = this.props.alarms.map((alarm) => {
            return React.createElement(Alarm, { alarm: alarm, key: alarm.id, postTime: this.props.postTime, toggleActive: this.props.toggleActive, postTitle: this.props.postTitle, archiveAlarm: this.props.archiveAlarm });
        });
        return (React.createElement("div", null, this.props.alarms.length === 0
            ?
                React.createElement(nothing_here_1.default, null)
            :
                alarms));
    }
}
exports.AlarmList = AlarmList;
class Alarm extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let activeButton;
        if (this.props.alarm.active) {
            activeButton = React.createElement("button", { type: 'submit', className: "button dark-button" }, "disable");
        }
        else {
            activeButton = React.createElement("button", { type: 'submit', className: "button light-button" }, "enable");
        }
        let duration = 200;
        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            entered: {
                opacity: 1,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exiting: {
                opacity: .8,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            }
        };
        return (React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, state => React.createElement("div", { className: "column contentWrapper", style: transitionStyles[state] },
            React.createElement("div", { className: "alarm-row" },
                React.createElement("div", { className: 'time-wrapper' },
                    React.createElement("div", { className: 'form-row' },
                        React.createElement("p", { className: "small-text centered-text" }, this.props.alarm.nextAlarm),
                        React.createElement("p", { className: "small-text centered-text" }, "\u2022"),
                        React.createElement(TitleForm, { alarm_uuid: this.props.alarm.alarm_uuid, title: this.props.alarm.title, postTitle: this.props.postTitle })),
                    React.createElement("div", { className: 'alarm-time-row' },
                        React.createElement(TimeForm, { alarm_uuid: this.props.alarm.alarm_uuid, time: this.props.alarm.time, postTime: this.props.postTime }),
                        React.createElement("div", { className: 'toggle-down' },
                            React.createElement(toggle_1.Toggler, { alarm: this.props.alarm, toggleActive: this.props.toggleActive }))))),
            React.createElement("div", { className: "alarm-row" },
                React.createElement("a", { href: '/app/accounts/{user_uuid}/settings' },
                    React.createElement("img", { className: 'icon fadeIn', src: '/icons/black/gear.svg' })),
                React.createElement(toggle_1.ArchiveAlarm, { alarm: this.props.alarm, archiveAlarm: this.props.archiveAlarm })))));
    }
}
class TimeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.time,
            form: false,
            formStyle: {
                width: '148.25px'
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() { document.addEventListener('mousedown', this.handleClickOutside); }
    componentWillUnmount() { document.removeEventListener('mousedown', this.handleClickOutside); }
    onBlur() {
        this.setState({
            form: !this.state.form,
            value: this.props.time
        });
    }
    setWrapperRef(node) { this.wrapperRef = node; }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event);
            this.onBlur();
        }
    }
    static calcWidth(chars) {
        if (chars < 5) {
            return ('30px');
        }
        else {
            return ((chars * 6) + 'px');
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            this.props.postTime({
                alarm_uuid: this.props.alarm_uuid,
                time: this.state.value
            }); // is this the only difference?    
        }
    }
    render() {
        return (React.createElement("div", null, !this.state.form
            ?
                React.createElement("div", { onClick: this.onBlur },
                    React.createElement("p", { className: 'alarm-time link-text' }, this.props.time))
            :
                React.createElement("form", { ref: this.setWrapperRef, onSubmit: this.handleSubmit, onBlur: this.onBlur },
                    React.createElement("input", { type: 'text', className: 'link-text-form alarm-time', value: this.state.value, onChange: this.handleChange, style: this.state.formStyle }))));
    }
}
class TitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.title,
            form: false,
            formStyle: {
                width: TitleForm.calcWidth(this.props.title.length)
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() { document.removeEventListener('mousedown', this.handleClickOutside); }
    onBlur() {
        this.setState({
            form: !this.state.form,
            value: this.props.title // changed
        });
    }
    setWrapperRef(node) { this.wrapperRef = node; }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event);
            this.onBlur();
        }
    }
    static calcWidth(chars) {
        if (chars < 5) {
            return ('30px');
        }
        else {
            return ((chars * 6) + 'px');
        }
    }
    handleChange(event) {
        this.setState({
            value: event.target.value,
            formStyle: {
                width: TitleForm.calcWidth(event.target.value.length)
            }
        }, () => console.log(this.state));
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.postTitle({
            alarm_uuid: this.props.alarm_uuid,
            title: this.state.value
        }); // is this the only difference?    
    }
    render() {
        console.log(this.state);
        return (React.createElement("div", null, !this.state.form
            ?
                React.createElement("div", { onClick: this.onBlur },
                    React.createElement("p", { className: 'alarm-title small-text link-text' }, this.props.title ? this.props.title : 'add title')) //changed class and property
            :
                React.createElement("form", { ref: this.setWrapperRef, onSubmit: this.handleSubmit, onBlur: this.onBlur },
                    React.createElement("input", { type: 'text', className: 'link-text-form alarm-title small-text small-form', value: this.state.value, onChange: this.handleChange, style: this.state.formStyle }))));
    }
}
//# sourceMappingURL=alarm-list.js.map