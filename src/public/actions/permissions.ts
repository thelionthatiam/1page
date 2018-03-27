export const REQ_PERMISSIONS = 'REQ_PERMISSIONS';

const reqPermissions = () => {
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


export function fetchPermissions(){
    return function (dispatch) {
        dispatch(reqPermissions())
        return fetch("http://localhost:8000/permission", {
                method: "get",
                credentials : 'same-origin',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                console.log('fetch permissions response');
                return res.json();
            })
            .then((body) => {
                let userSession = JSON.parse(body); 
                dispatch(receivePermissions(userSession));
            })
            .catch((err) => {
                console.log(err)
            })
    }
}