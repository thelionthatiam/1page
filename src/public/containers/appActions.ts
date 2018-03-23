import { connect } from 'react-redux';
import { guest, user } from '../actions/permissions';
import { fetchPermissions } from '../actions/async-permissions';
import App from '../components/spa'


const mapStateToProps = (state, ownProps) => {
    return {
        message: state.permissionCheck.message
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        isLoggedIn: () => dispatch(user()),
        isNotLoggedIn: () => dispatch(guest()),
        permissionChecker: () => dispatch(fetchPermissions())
    }
}

const AppWithActions = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppWithActions