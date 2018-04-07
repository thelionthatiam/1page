import { connect } from 'react-redux';
import { fetchAlarms } from '../actions/alarms';
import UserAlarms from '../components/user-alarms'

console.log('ALARM ACTIONS:', window.userData)

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.getPermissions,
        profile: state.getPermissions.profile,
        alarms: state.getPermissions.alarms,
        settings: state.getPermissions.settings,
        orgs: state.getPermissions.orgs,
        permission: state.getPermissions.permission
    }
}

const AlarmsWithActions = connect(mapStateToProps)(UserAlarms)


export default AlarmsWithActions