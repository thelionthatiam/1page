import * as React from 'react';
import * as ReactDOM from 'react-dom';


interface ClockState {
    date:Date;
    time:string;
    savedTimes: string[];
    showControls: boolean;
}


export class SimpleClock extends React.Component {
    state:ClockState;

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            time: '',
            savedTimes:props.alarms,
            showControls: true
        }
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
        let now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        // console.log(now)
        for (let i = 0; i < this.state.savedTimes.length; i++) {
        //    console.log(now, this.state.savedTimes[i])
            if (now === this.state.savedTimes[i]) {
                this.setState({
                    showControls:true
                }, () => console.log(this.state))
            }
        }

        this.setState({
            date: new Date()
        }, () => {
            // console.log(this.state.date.toLocaleTimeString('en-US', { hour12: false }), this.state.savedTimes)
        });
    }
    handleChange(event) {
        this.setState({
            time: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className='clock'>
                    <h1>{this.state.date.toLocaleTimeString('en-US', { hour12: false })}</h1>
                </div>
                <div className='clock'>
                    <AlarmController showControls = {this.state.showControls}/>
                </div>
            </div>
        )
    }
}

class AlarmController extends React.Component {
    style:string;

    constructor(props) {
        super(props)
        this.style
    }

    render() {
        if (this.props.showControls) {
            this.style = 'alarm-control-wrapper'
        } else {
            this.style = 'alarm-control-wrapper none'
        }
        return (
            <div className = {this.style}>
                <h1>state</h1>
                <p>title</p>
                <button className='button dark-button'>wake</button>
                <button className = 'button dark-button'>snooze</button>
                <button className='button dark-button'>dismiss</button>                
            </div>
        )
    }
}
const AlarmList = ({ alarms }) => {
    // console.log('this is for the alarm:', alarms)
    function alarmTimesToArr() {
        let arr = []
        for (let i = 0; i < alarms.length; i++) {
            arr.push(alarms[i].time)
        }
        // console.log(arr)
        return arr
    }
    return (
        <div>
            <ul>
                {alarms.map(alarm => <li key={alarm.id}>{alarm.time}</li>)}
            </ul>
        </div>
    )
}
