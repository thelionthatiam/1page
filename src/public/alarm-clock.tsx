import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';


interface ClockState {
    date:Date;
    time:string;
    savedTimes: string[];
}


class Clock extends React.Component {
    state:ClockState;
    

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            time: '',
            savedTimes:props.alarms
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
           // console.log(now, this.state.savedTimes[i])
            if (now === this.state.savedTimes[i]) {
                alert('your alarm at ' + this.state.savedTimes[i] + ' just happend. go do something about it!')
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
            <div className='clock'>
                <h1>{this.state.date.toLocaleTimeString('en-US', { hour12: false })}</h1>
            </div>
        )
    }
}


export const AlarmList = ({alarms}) => {
    console.log('this is for the alarm:', alarms)
    function alarmTimesToArr() {
        let arr = []
        for (let i =0; i < alarms.length; i++) {
            arr.push(alarms[i].time)
        }
        console.log(arr)
        return arr
    }
    return (
        <div>
            <Clock alarms = {alarmTimesToArr()}/>
            <ul>
                {alarms.map(alarm => <li key = {alarm.id}>{alarm.time}</li>)}
            </ul>
        </div>
    )
}
        
        
const mapStateToProps = state => {
    console.log('mapping for alarmlist', state)
    return {
            alarms: state.userData.alarms
        }
}

export const AlarmClock = connect(mapStateToProps)(AlarmList)