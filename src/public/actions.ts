export const REQ_NAME_CHANGE = 'REQ_NAME_CHANGE'
export const RES_NAME_CHANGE = 'RES_NAME_CHANGE'


export function reqNewName(v) {
    console.log('req new name, here is a new name: ', v)
    return { type: REQ_NAME_CHANGE}
}


function recieveNewName(user) {
    console.log('RECIEVE NEW NAME', user)
    return {
        type: RES_NAME_CHANGE,
        profile:user
    }
}

export function fetchNewName(v) {
    console.log('fetch new name', v)
    return function (dispatch) {
        dispatch(reqNewName(v)) 
        return fetch("/new-name", {
            method: "post",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body:JSON.stringify({name:v})
        })
        .then((res) => {
            console.log(res)
            return res.json();
        })
        .then(user => {
            console.log(user)
            dispatch(recieveNewName(user))
        })
        .catch(e => console.log(e))
    }
}
