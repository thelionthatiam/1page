import * as React from 'react';
import { connect, Provider } from 'react-redux';
import { fetchNewTime } from './actions';

export class AlarmList extends React.Component {
    props: {
        alarms:any;
        postTime:any;
    }

    constructor(props) {
        super(props)

    }

    render() {
        let alarms = this.props.alarms.map((alarm) => {
            return <Alarm 
                    alarm = {alarm}
                    key={alarm.id}
                    postTime = {this.props.postTime}
                />
        })
        return (
            <div>
                <h1>{alarms}</h1>
            </div>
        )
    }
}


class Alarm extends React.Component {
    props: {
        alarm:any;
        postTime:any;
    }

    constructor(props) {
        super(props)
    }

    render() {
        let titleAction = "/app/accounts/" + this.props.alarm.user_uuid + "/alarms/" + this.props.alarm.alarm_uuid + "/title";
        let timeAction = "/app/accounts/" + this.props.alarm.time + "/alarms/" + this.props.alarm.alarm_uuid + "/title";
        let activeButton;
        if (this.props.alarm.active) {
            activeButton = <button type='submit' className="button dark-button">disable</button>
        } else {
            activeButton = <button type='submit' className="button light-button">enable</button>
        }
        
        return (
            <div className="column contentWrapper">
                <div className="alarm-row">
                    <div className = 'time-wrapper'>
                        <form className = 'form-row' action={titleAction} method='get'>
                            <input type='submit' className = "alarm-title small-text link-text" value={this.props.alarm.title}/>
                            <p className="small-text centered-text">•</p>
                            <p className = "small-text centered-text">tomorrow</p>
                            <input name="alarm_uuid" type="hidden" value= {this.props.alarm.alarm_uuid}/>
                            <input name="title" type='hidden' value={this.props.alarm.title}/>
                        </form>                        
                        <div className='alarm-time-row'>
                            <TimeForm
                                alarm_uuid={this.props.alarm.alarm_uuid}
                                time={this.props.alarm.time}
                                postTime={this.props.postTime}
                            />
                            <form action='/app/accounts/{user_uuid}/alarms/{alarm_uuid}/active?_method=PUT' method='POST'>
                                {activeButton}
                                <input name="alarm_uuid" type="hidden" value={this.props.alarm.alarm_uuid} />
                                <input name="active" type='hidden' value={this.props.alarm.active} />
                            </form>

                        </div>
                    </div>
                </div>
                    
                <div className="alarm-row">
                    <a href='/app/accounts/{user_uuid}/settings'>
                        <img className='icon fadeIn' src='/icons/black/gear.svg'/>
                    </a>
                    <form action="/app/accounts/{user_uuid}/alarms/{alarm_uuid}?_method=DELETE" method="POST">
                        <input className = "icon" type="image" width="20px" height="20px" src="/icons/black/x.svg"/>
                        <input name="alarm_uuid" type="hidden" value={this.props.alarm.alarm_uuid}/>
                    </form>
                </div>
            </div>
        )
    }
}



class TimeForm extends React.Component {
    state: {
        value: string;
        form: boolean;
    }
    props: {
        postTime: any;
        alarm_uuid:string;
        time:string;
    }
    alarm_uuid: string;
    wrapperRef: Node;

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.time,
            form: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {document.addEventListener('mousedown', this.handleClickOutside)}
    componentWillUnmount() {document.removeEventListener('mousedown', this.handleClickOutside)}

    onBlur() {
        this.setState({
            form:!this.state.form,
            value:this.props.time
        })
    }

    setWrapperRef(node) { this.wrapperRef = node }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleSubmit(event)
            this.onBlur()
        }
    }

    handleChange(event) {
        if (event.target.value !== '') {
            this.setState({ value: event.target.value });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value !== '') {
            this.props.postTime({
                alarm_uuid: this.props.alarm_uuid,
                time: this.state.value
            }) // is this the only difference?    
        }        
    }

    render() {
        return (
            <div>
                {!this.state.form 
                ? 
                <div onClick={this.onBlur}><p className = 'alarm-time link-text'>{this.props.time}</p></div> 
                :  
                <form  ref = {this.setWrapperRef} onSubmit = {this.handleSubmit} onBlur = {this.onBlur}>
                    <input type='text' className='link-text-form alarm-time' value = {this.state.value} onChange={this.handleChange} />
                </form>}
            </div>
        )
    }
}
