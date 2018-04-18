import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';


class Clock extends React.Component {
    state: { 
        date:Date;
        time: string;
        alarms: any;
        showControls:boolean;
    }
    timerID: () => void;

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            time: '',
            alarms: props.alarms,
            showControls: false
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => {
                console.log('tick')
                return this.tick()
            },
            1000
        )
    }

    componentWillMount() {}



    tick() {
        let now = this.state.date.toLocaleTimeString('en-US', { hour12: false });
        for (let i = 0; i < this.state.alarms.length; i++) {
            if (now === this.state.alarms[i]) {
                this.setState({
                    showControls: true
                }, () => console.log(this.state))
            }
        }

        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <div className='clock'>
                    <h1>{this.state.date.toLocaleTimeString('en-US', { hour12: false })}</h1>
                </div>
                <pre>{JSON.stringify(this.state.alarms, undefined, 2)}</pre>
                <div className='clock'>
                    <AlarmController showControls={this.state.showControls} />
                </div>
            </div>
        )
    }
}

class AlarmController extends React.Component {
    style: string;
    props: {
        showControls:boolean;
    }

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
            <div className={this.style}>
                <h1>state</h1>
                <p>title</p>
                <button className='button dark-button'>wake</button>
                <button className='button dark-button'>snooze</button>
                <button className='button dark-button'>dismiss</button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    // console.log('mapping for alarmlist', state)
    return {
        alarms: state.userData.alarms
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}



export const AlarmClock = connect(mapStateToProps, mapDispatchToProps)(Clock)