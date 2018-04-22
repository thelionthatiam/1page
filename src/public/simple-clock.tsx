import * as React from 'react';
import * as ReactDOM from 'react-dom';


export class SimpleClock extends React.Component {
    timerID:() => void;
    state: {
        savedTimes:string[];
        date:Date;
        time:string;

    }



    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            time: '',
            savedTimes: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    componentWillMount() {
        clearInterval(this.timerID);
    }

    tick() {
        let now = this.state.date.toTimeString().split(' ')[0];
        let times = this.state.savedTimes;

        for (let i = 0; i < times.length; i++) {
            let alarm = times[i] + ':00'
            if (now === alarm) {
                alert('your alarm at ' + alarm + ' just happend. go do something about it!')
            }
        }

        this.setState({
            date: new Date()
        });
    }

    handleSubmit(event) {
        let currentTimes = this.state.savedTimes
        currentTimes.push(this.state.time);
        this.setState({
            savedTime: currentTimes
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            time: event.target.value
        })
    }

    render() {
        return (
            <div className = "column contentWrapper">
                <Clock time={this.state.date.toLocaleTimeString()} />
                <AlarmForm
                    formSubmit={this.handleSubmit}
                    time={this.state.time}
                    inputChange={this.handleChange}
                />
                <Alarms savedTimes={this.state.savedTimes} />
            </div>
        )
    }
}

function Clock(props) {
    return (
        <div className='clock'>
            <h1>
                {props.time}
            </h1>
        </div>
    )
}

function AlarmForm(props) {


    return (
        <div>
            <h4>create a new alarm</h4>
            <form onSubmit={props.formSubmit}>
                <input
                    className='big-form-item'
                    type='time'
                    time={props.time}
                    onChange={props.inputChange}
                />
                <button className="button dark-button">add </button>
            </form>
        </div>
    );
}


class Alarms extends React.Component {
    props: {
        savedTimes: string[];
    }
    alarms:string[];


    constructor(props) {
        super(props);
        this.alarms = props.savedTimes;
    }

    render() {
        return (
            <div className='alarm-time'>
                <SavedAlarmsTitle alarms={this.alarms} />
                <SavedAlarms alarms={this.alarms} />
            </div>
        );
    }
}

function SavedAlarmsTitle(props) {
    const alarms = props.alarms;
    if (alarms.length < 1) {
        return <h3>start adding alarms to see them here!</h3>;
    } else {
        return <h2>saved alarms</h2>;
    }
}

function SavedAlarms(props) {
    const alarms = props.alarms
    const savedAlarms = alarms.map((alarm) =>
        <li key={alarm}>
            <h3>{alarm}</h3>
        </li>
    )

    return (
        <ul>{savedAlarms}</ul>
    )
}