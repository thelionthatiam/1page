export const REQ_USER = 'REQ_USER';

const reqUserData = () => {
    return {type: REQ_USER}
}

export const RECEIVE_USER = 'RECEIVE_USER'

function receiveUserData(json) {
    console.log('recieve user data')
    return {
        type: RECEIVE_USER,
        gets: json,
        receivedAt: Date.now()
    }
}

export function fetchUserData() {
    return function (dispatch) {
        console.log('fetch user data')
        dispatch(reqUserData())
        return fetch("http://localhost:8000/user-data", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log('fetch user data response', res);
            return res.json();
        }).then((body) => {
            console.log(typeof body)
            let userData = JSON.stringify(body);
            dispatch(receiveUserData(body));
        })
        .catch((err) => {
            console.log(err)
        })
    }
}