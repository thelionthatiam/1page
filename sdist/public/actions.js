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
        test: test
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
            .then(function (res) { return res.json(); })
            .then(function (test) {
            if (test.status === 'failed') {
                return dispatch(recieveError(test, dispatch));
            }
            console.log('fetch test data', test);
            dispatch(resTestData(test));
        });
    };
}
exports.fetchTestData = fetchTestData;
//# sourceMappingURL=actions.js.map