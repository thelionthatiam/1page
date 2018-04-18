export const REQ_NAME_CHANGE = 'REQ_NAME_CHANGE'
export const RES_NAME_CHANGE = 'RES_NAME_CHANGE'


export function reqNewName(v) {
    console.log('req new name, here is a new name: ', v)
    return { type: REQ_NAME_CHANGE}
}


function recieveNewName(name) {
    console.log('RECIEVE NEW NAME', name)
    return {
        type: RES_NAME_CHANGE,
        newName: name
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
        .then(name => {
            console.log(name)
            dispatch(recieveNewName(name))
        })
        .catch(e => console.log(e))
    }
}
