import {connect} from 'react-redux';
import { fetchAlarms } from '../actions/alarms';
import Alarms from '../components/alarm-clock'

const mapStateToProps = (state, ownProps) => {
    return {
        alarms: state.getAlarms.alarms,
        permission: state.getPermissions.permission
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alarmGetter: () => dispatch(fetchAlarms())
    }
}

const AlarmsWithActions = connect(mapStateToProps, mapDispatchToProps)(Alarms)

export default AlarmsWithActions