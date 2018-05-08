// ERROR HANDLING
export const GEN_ERR = 'GEN_ERR'
export const CLEAR_ERR = 'CLEAR_ERR'

export function clearError() {
    return {
        type: CLEAR_ERR,
        error: 'dismissed',
        route: 'dismissed'
    }
    
}

export function recieveError(error, dispatch) {
    if (error.error !== null && typeof error.error === 'object') {
        console.log('The input was an object from postgres, write a more specific error for the route: ', error.route)
        error.error = 'There was a problem with your input. Try again.'
    }
    return {
        type: GEN_ERR,
        error: error.error,
        route: error.route
    }
}


// SAMPLE THUNK
export const REQ_TEST = 'REQ_TEST';
export const RES_TEST = 'RES_TEST';

export function reqTestData() {
    return { type: REQ_TEST }
}

function resTestData(test) {
    return {
        type: RES_TEST,
        test
    }
}

export function fetchTestData() {
    return function (dispatch) {
        dispatch(reqTestData())
        return fetch("/test", {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(test => {
                if (test.status === 'failed') {
                    return dispatch(recieveError(test, dispatch))
                }
                console.log('fetch test data', test)
                dispatch(resTestData(test))
            })
    }
}
