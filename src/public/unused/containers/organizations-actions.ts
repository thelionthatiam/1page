import { connect } from 'react-redux';
import { fetchAlarms } from '../actions/alarms';
import UserOrgs from '../components/user-organizations'

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

const OrgsWithActions = connect(mapStateToProps)(UserOrgs)


export default OrgsWithActions