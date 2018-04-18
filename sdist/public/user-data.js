"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// action
exports.POPULATE = 'POPULATE';
// action creator
// export const populate = userData => ({
//     type: POPULATE,
//     userData
// })
function populate(userData) {
    console.log('~~~~~~~~~~~~~~~~~~.6 userData', userData);
    return {
        type: exports.POPULATE,
        userData: userData
    };
}
exports.populate = populate;
// export const REQ_USER = 'REQ_USER';
// const reqUserData = () => {
//     return {type: REQ_USER}
// }
// export const RECEIVE_USER = 'RECEIVE_USER'
// function receiveUserData(json) {
//     return {
//         type: RECEIVE_USER,
//         profile: json.profile,
//         alarms: json.alarms,
//         settings: json.settings,
//         orgs: json.orgs,
//         receivedAt: Date.now()
//     }
// }
// // export function fetchUserData() {
// //     return function (dispatch) {
// //         dispatch(reqUserData())
// return fetch("http://localhost:8000/user-data", {
//     method: "get",
//     credentials: 'same-origin',
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     }
// //         }).then((res) => {
// //             return res.json();
// //         }).then((body) => {
// //             dispatch(receiveUserData(body));
// //         })
// //         .catch((err) => {
// //             console.log(err)
// //         })
// //     }
// // }
// export function fetchUserData(userData) {
//     return userData
// } 
//# sourceMappingURL=user-data.js.map