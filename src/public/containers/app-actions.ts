import { connect } from 'react-redux';
import { fetchPermissions } from '../actions/permissions';
import { fetchUserData } from '../actions/user-data'
import App from '../spa'

const mapStateToProps = (state, ownProps) => {
    console.log('state', state.getUserData.user.profile.email)
    return {
        permission: state.getPermissions.permission,
        email: state.getUserData.user.profile
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('dispatch function')
    return {
        permissionChecker: () => dispatch(fetchPermissions()),
        getUserData: () => dispatch(fetchUserData())

    }
}

const AppWithActions = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppWithActions