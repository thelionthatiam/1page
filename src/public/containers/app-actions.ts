import { connect } from 'react-redux';
import { fetchPermissions } from '../actions/permissions';
import App from '../components/spa'

const mapStateToProps = (state, ownProps) => {
    return {
        permission: state.getPermissions.permission
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        permissionChecker: () => dispatch(fetchPermissions())
    }
}

const AppWithActions = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppWithActions