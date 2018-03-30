import { connect } from 'react-redux';
import { fetchAlarms } from '../actions/alarms';
import UserProfile from '../components/user-profile'

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

const ProfileWithActions = connect(mapStateToProps)(UserProfile)


export default ProfileWithActions