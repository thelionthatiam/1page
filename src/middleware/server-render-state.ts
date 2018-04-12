import {RenderStateSvc} from '../logic/logic-middleware';

function renderState(req, res, next) {
    console.log('render state running')
    console.log(res.locals)
    if (res.locals.permission === 'user') {
        res.locals.loggedIn = true;
        req.RenderStateSvc = new RenderStateSvc(req.querySvc, req.session.user)

        req.RenderStateSvc.getEverything()
            .then(user => {
                res.locals.user = user
                res.locals.stringUser = JSON.stringify(user)
                console.log('**********************\n', res.locals.user, '\n**********************\n')
                console.log('**********************\n', res.locals.stringUser, '\n**********************\n')
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
        console.log('render state says im a guest')
        next();
    }
}
//
export default renderState;
