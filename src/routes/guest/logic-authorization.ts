import {
    checkEmail,
    checkPassword,
    regenerateSession,
    updateSession,
    defineSession,
    updateToInactiveSessionID,
    destroySession
} from '../functions/business-logic';


export function doAuth(client, user, email, password, session, sessionID) {
    return new Promise (
        (resolve, reject) => {
            checkEmail(client, email)
                .then((result) => {
                    user = result;
                    return checkPassword(password, user.password);
                })
                .then((boolean) => {
                    console.log('%%%%%%%%before regen', session.id)
                    return regenerateSession(session);
                })
                .then(() => {
                    console.log('%%%%%%%%after regen', session.id)
                    return updateSession(client, session.id, user.user_uuid);
                })
                .then((result) => {
                    let userSession = defineSession(user);
                    console.log('final promise doauth', session.id)
                    resolve(userSession);
                })
                .catch((err) => reject(err))
        }
    )
}