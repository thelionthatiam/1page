"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_sound_1 = require("react-sound");
const actions_1 = require("./actions");
const actions_alarm_1 = require("./actions-alarm");
const alarm_list_1 = require("./alarm-list");
const react_redux_1 = require("react-redux");
class Clock extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: '',
            showControls: false,
            value: ''
        };
    }
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.props.updateAlarms();
            return this.tick();
        }, 1000);
    }
    tick() {
        let now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        for (let i = 0; i < this.props.alarms.length; i++) {
            if (now === this.props.alarms[i].time) { // just changed this without checking 4.19.18 13:39
                this.setState({
                    showControls: true
                });
            }
        }
        this.setState({
            date: new Date()
        });
    }
    render() {
        let messages = this.props.alarms.map((alarm) => {
            if (alarm.state === 'ringing') {
                return React.createElement(AlarmController, { alarm: alarm, key: alarm.id });
            }
        });
        let error;
        if (this.props.error && this.props.error !== 'dismissed') {
            error = React.createElement("div", { className: "test-error" },
                React.createElement("h1", { className: "textError" }, "Error"),
                React.createElement("p", { className: "textError one-item-spacing" }, this.props.error),
                React.createElement("button", { className: 'button dark-button', onClick: this.props.clearError }, "got it"));
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: 'clock' },
                React.createElement("h1", null, this.state.date.toLocaleTimeString('en-US', { hour12: false }))),
            React.createElement("div", { className: 'alarm-controllers-wrapper' }, messages),
            React.createElement(alarm_list_1.AlarmList, { alarms: this.props.alarms, postTime: this.props.postTime, postTitle: this.props.postTitle, toggleActive: this.props.toggleActive, archiveAlarm: this.props.archiveAlarm }),
            React.createElement(AddAlarmForm, { postAlarm: this.props.postAlarm }),
            error));
    }
}
class AlarmController extends React.Component {
    constructor(props) {
        super(props);
        this.style = 'alarm-control-wrapper';
        this.alarm = this.props.alarm;
    }
    render() {
        if (this.alarm.state === 'ringing') {
            this.style = 'alarm-control-wrapper';
        }
        let dismissRoute = "/app/accounts/" + this.alarm.user_uuid + "/alarms/" + this.alarm.alarm_uuid + "/dismiss";
        let snoozeRoute = "/app/accounts/" + this.alarm.user_uuid + "/alarms/" + this.alarm.alarm_uuid + "/snooze";
        return (React.createElement("div", { className: this.style },
            React.createElement("h1", null,
                this.alarm.state,
                "!!!"),
            React.createElement("p", null, this.alarm.title),
            React.createElement("p", null, this.alarm.time),
            React.createElement("div", { className: 'alarm-control-button-wrapper' },
                React.createElement("form", { action: dismissRoute, method: "POST" },
                    React.createElement("input", { className: "button light-button", type: 'submit', value: 'dismiss' }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.alarm.alarm_uuid })),
                React.createElement(MathProblem, { alarm: this.alarm }),
                React.createElement("form", { action: snoozeRoute, method: "POST" },
                    React.createElement("input", { className: "button light-button", type: 'submit', value: 'snooze' }),
                    React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.alarm.alarm_uuid }))),
            React.createElement(react_sound_1.default, { url: "/sounds/ring-song.mp3", playStatus: react_sound_1.default.status.PLAYING })));
    }
}
class MathProblem extends React.Component {
    constructor(props) {
        super(props);
        this.randomNumber = () => Math.floor((Math.random() * 20));
        this.state = {
            value: '',
            answer: 0,
            showWakeButton: false,
            one: this.randomNumber(),
            two: this.randomNumber(),
            three: this.randomNumber(),
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (parseInt(this.state.value) === this.state.answer) {
            this.setState({
                showWakeButton: true
            });
        }
    }
    render() {
        this.state.answer = this.state.one + this.state.two + this.state.three;
        if (this.state.showWakeButton) {
            let wakeRoute = "/app/accounts/" + this.props.alarm.user_uuid + "/alarms/" + this.props.alarm.alarm_uuid + "/wake";
            return (React.createElement("form", { action: wakeRoute, method: "POST" },
                React.createElement("input", { className: "button light-button", type: 'submit', value: 'wake' }),
                React.createElement("input", { name: "alarm_uuid", type: "hidden", value: this.props.alarm.alarm_uuid })));
        }
        return (React.createElement("div", null,
            React.createElement("p", null, "find the sum"),
            React.createElement("p", null,
                this.state.one,
                " + ",
                this.state.two,
                " + ",
                this.state.three,
                " ="),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("input", { type: 'text', className: 'big-form-item', value: this.state.value, onChange: this.handleChange }),
                React.createElement("input", { type: "submit", value: "Submit", className: 'button dark-button' }))));
    }
}
class AddAlarmForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: false,
            title: '',
            time: '',
            buttonStyle: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openForm = this.openForm.bind(this);
    }
    openForm() {
        if (this.state.form) {
            this.setState({
                buttonStyle: '',
                form: false
            });
        }
        else {
            this.setState({
                buttonStyle: 'rotate-right',
                form: true
            });
        }
    }
    handleChange(event) { this.setState({ [event.target.name]: event.target.value }); }
    handleSubmit(event) {
        event.preventDefault();
        this.props.postAlarm({
            title: this.state.title,
            time: this.state.time
        });
        this.setState({
            form: false,
            title: '',
            time: '',
            buttonStyle: ''
        });
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: this.state.form ? 'curtain' : '' }),
            React.createElement("div", { className: this.state.form ? "flex column popup-form" : "flex column popup-form-pre" },
                this.state.form
                    ?
                        React.createElement("div", { className: "add-alarm" },
                            React.createElement("h1", { className: 'light-text' }, "add alarm"),
                            React.createElement("form", { onSubmit: this.handleSubmit },
                                React.createElement("input", { name: "time", className: "link-text-form alarm-time special", type: "text", placeholder: "06:00", value: this.state.time, onChange: this.handleChange }),
                                React.createElement("input", { name: "title", className: "link-text-form alarm-time special", type: "text", placeholder: "work week", value: this.state.title, onChange: this.handleChange }),
                                React.createElement("button", { className: "button light-button", type: "submit" }, " submit ")))
                    :
                        React.createElement("div", { className: "add-alarm-placeholder" }),
                React.createElement("div", { className: "fixed-center-wrapper" + " " + this.state.buttonStyle, onClick: this.openForm },
                    React.createElement("img", { src: '/icons/white/plus.svg', className: 'icon add-alarm-icon' })))));
    }
}
const mapStateToProps = state => {
    return {
        alarms: state.userData.alarms,
        error: state.userData.error
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateAlarms: () => dispatch(actions_alarm_1.fetchAlarms()),
        postTime: (v) => dispatch(actions_alarm_1.fetchNewTime(v)),
        postTitle: (v) => dispatch(actions_alarm_1.fetchAlarmTitle(v)),
        toggleActive: (v) => dispatch(actions_alarm_1.fetchActiveToggle(v)),
        postAlarm: (v) => dispatch(actions_alarm_1.fetchNewAlarm(v)),
        archiveAlarm: (v) => dispatch(actions_alarm_1.fetchAlarmArchive(v)),
        clearError: () => dispatch(actions_1.clearError()),
    };
};
exports.AlarmClock = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Clock);
//# sourceMappingURL=alarm-clock.js.map