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


// ALBUMS THUNK
export const REQ_PHOTOS = 'REQ_PHOTOS';
export const RES_PHOTOS = 'RES_PHOTOS';

export function reqPhotos() {
    return { type: REQ_PHOTOS }
}

function resPhotos(albums) {
    return {
        type: RES_PHOTOS,
        albums
    }
}

export function fetchPhotos(route) {
    console.log('this is the second most important test', route)
    let fullRoute = '/content' + route
    return function (dispatch) {
        dispatch(reqPhotos())
        return fetch(fullRoute, {
            method: "get",
            credentials: 'same-origin',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(albums => {
                if (albums.status === 'failed') {
                    return dispatch(recieveError(albums, dispatch))
                }
                dispatch(resPhotos(albums))
            })
    }
}

// OPEN BLINDS 
export const OPEN_BLINDS = 'OPEN_BLINDS';
export const CLOSE_BLINDS = 'CLOSE_BLINDS';
export function toggleBlinds(id, isOpen) {
    if (isOpen) {
        return {
            type: OPEN_BLINDS,
            id: id
        }
    } else {
        return {
            type: CLOSE_BLINDS
        }
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
                dispatch(resTestData(test))
            })
    }
}


// SCROLL LOCK 

export const SCROLL_LOCK = 'SCROLL_LOCK'

export function lockScroll() {
    return {scroll: false}
}