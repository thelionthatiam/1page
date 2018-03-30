export const REQ_PERMISSIONS = 'REQ_PERMISSIONS';

export const reqPermissions = () => {
    return {
        type: REQ_PERMISSIONS,
    }
}

export const RECEIVE_PERMISSIONS = 'RECEIVE_PERMISSIONS'

function receivePermissions(json) {
    return {
        type: RECEIVE_PERMISSIONS,
        gets: json.permission,
        receivedAt: Date.now()
    }
}
