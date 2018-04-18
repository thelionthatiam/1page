import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { populate } from './user-data';
import { fetchNewName } from './actions';

const Test = ({userData, onSubmit}) => {
    console.log(onSubmit)
    console.log(userData)
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input type='text' className = 'big-form-item'/>
                <button type ='submit'>submit</button>
            </form>

            <h1>profile</h1>
                <p>{userData.profile.name}</p>
                <p>{userData.profile.email}</p>
                <p>{userData.profile.phone}</p>
                <p>{userData.profile.permission}</p>
            <h1>alarms</h1>
                <h4>{userData.alarms[0].title}</h4>
                    <p>{userData.alarms[0].time}</p>
                    <p>{userData.alarms[0].user_uuid}</p>
                    <p>{userData.alarms[0].state}</p>
                    <p>{userData.alarms[0].repeat}</p>
        </div>
    )
}

class NewTest extends React.Component {
    state: {
        value: string;
    }
    props: {
        postName:(string) => string; 
    }


    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postName(this.state.value)
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' className = 'big-form-item' value = {this.state.value} onChange = {this.handleChange} />
                    <input type="submit" value="Submit" className = 'button dark-button' />
                </form>

                <h1>profile</h1>
                <p>{this.props.userData.profile.name}</p>
                <p>{this.props.userData.profile.email}</p>
                <p>{this.props.userData.profile.phone}</p>
                <p>{this.props.userData.profile.permission}</p>
                <h1>alarms</h1>
                <h4>{this.props.userData.alarms[0].title}</h4>
                <p>{this.props.userData.alarms[0].time}</p>
                <p>{this.props.userData.alarms[0].user_uuid}</p>
                <p>{this.props.userData.alarms[0].state}</p>
                <p>{this.props.userData.alarms[0].repeat}</p>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postName:(v) => dispatch(fetchNewName(v))
    }
}

const TestApp = connect(
    mapStateToProps, 
    mapDispatchToProps
)(NewTest)



export { TestApp };