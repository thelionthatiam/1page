import { connect } from 'react-redux';
import { reqPermissions } from '../actions/permissions';
import { fetchUserData } from '../actions/user-data'
import App from '../spa'

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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // getUserData: () => dispatch(fetchUserData()),
        permissionChecker: () => dispatch(reqPermissions()),
    }
}

const AppWithActions = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppWithActions