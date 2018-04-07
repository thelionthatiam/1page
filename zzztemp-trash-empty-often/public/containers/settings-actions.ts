import { connect } from 'react-redux';
import { fetchAlarms } from '../actions/alarms';
import UserSettings from '../components/user-settings'

const mapStateToProps = (state, ownProps) => {
    return {
        userData: state.getUserData,
        profile: state.getUserData.profile,
        alarms: state.getUserData.alarms,
        settings: state.getUserData.settings,
        orgs: state.getUserData.orgs,
        permission: state.getPermissions.permission
    }
}

const SettingsWithActions = connect(mapStateToProps)(UserSettings)


export default SettingsWithActions