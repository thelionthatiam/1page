import {RenderStateSvc} from '../logic/logic-middleware';

function renderState(req, res, next) {
    if (res.locals.permission === 'user') {
        res.locals.loggedIn = true;
        req.RenderStateSvc = new RenderStateSvc(req.querySvc, req.session.user)

        req.RenderStateSvc.getEverything()
            .then(user => {
                res.locals.user = user
                res.locals.stringUser = JSON.stringify(user)
                next();
            })
            .catch(err => {
                console.log(err)
                res.locals.userState = null;
                res.locals.permission = 'guest';
                res.render('error', {errMessage: err});
            })
    } else {
        res.locals.loggedIn = false;
        next();
    }
}
//
export default renderState;
