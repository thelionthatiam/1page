"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ERROR HANDLING
exports.GEN_ERR = 'GEN_ERR';
exports.CLEAR_ERR = 'CLEAR_ERR';
function clearError() {
    return {
        type: exports.CLEAR_ERR,
        error: 'dismissed',
        route: 'dismissed'
    };
}
exports.clearError = clearError;
function recieveError(error, dispatch) {
    if (error.error !== null && typeof error.error === 'object') {
        console.log('The input was an object from postgres, write a more specific error for the route: ', error.route);
        error.error = 'There was a problem with your input. Try again.';
    }
    return {
        type: exports.GEN_ERR,
        error: error.error,
        route: error.route
    };
}
exports.recieveError = recieveError;
// ALBUMS THUNK
exports.REQ_PHOTOS = 'REQ_PHOTOS';
exports.RES_PHOTOS = 'RES_PHOTOS';
function reqPhotos() {
    return { type: exports.REQ_PHOTOS };
}
exports.reqPhotos = reqPhotos;
function resPhotos(albums) {
    return {
        type: exports.RES_PHOTOS,
        albums
    };
}
function fetchPhotos(route) {
    console.log('this is the second most important test', route);
    let fullRoute = '/content' + route;
    return function (dispatch) {
        dispatch(reqPhotos());
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
                return dispatch(recieveError(albums, dispatch));
            }
            dispatch(resPhotos(albums));
        });
    };
}
exports.fetchPhotos = fetchPhotos;
// OPEN BLINDS 
exports.OPEN_BLINDS = 'OPEN_BLINDS';
exports.CLOSE_BLINDS = 'CLOSE_BLINDS';
function toggleBlinds(id, isOpen) {
    if (isOpen) {
        return {
            type: exports.OPEN_BLINDS,
            id: id
        };
    }
    else {
        return {
            type: exports.CLOSE_BLINDS
        };
    }
}
exports.toggleBlinds = toggleBlinds;
// SAMPLE THUNK
exports.REQ_TEST = 'REQ_TEST';
exports.RES_TEST = 'RES_TEST';
function reqTestData() {
    return { type: exports.REQ_TEST };
}
exports.reqTestData = reqTestData;
function resTestData(test) {
    return {
        type: exports.RES_TEST,
        test
    };
}
function fetchTestData() {
    return function (dispatch) {
        dispatch(reqTestData());
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
                return dispatch(recieveError(test, dispatch));
            }
            dispatch(resTestData(test));
        });
    };
}
exports.fetchTestData = fetchTestData;
// SCROLL LOCK 
exports.SCROLL_LOCK = 'SCROLL_LOCK';
function lockScroll() {
    return { scroll: false };
}
exports.lockScroll = lockScroll;
//# sourceMappingURL=actions.js.map