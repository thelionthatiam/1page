import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { populate } from './actions/user-data'


const Test = ({userData}) => {
    return (
        <div>
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

const mapStateToProps = state => {
    return {
        userData: state.userData
    }
}

const TestApp = connect(
    mapStateToProps
)(Test)



export { TestApp };