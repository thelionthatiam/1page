"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_middleware_1 = require("../logic/logic-middleware");
function renderState(req, res, next) {
    console.log('render state running');
    console.log(res.locals);
    if (res.locals.permission === 'user') {
        res.locals.loggedIn = true;
        req.RenderStateSvc = new logic_middleware_1.RenderStateSvc(req.querySvc, req.session.user);
        req
            .RenderStateSvc
            .getEverything()
            .then(function (userData) {
            res.locals.userData = userData;
            res.locals.userDataForRender = JSON.stringify(userData);
            res.locals.email = req.session.user.email;
            res.locals.uuid = req.session.user.uuid;
            console.log('**********************', res.locals);
            next();
        })
            .catch(function (err) {
            console.log(err);
            res.locals.userState = null;
            res.locals.permission = 'guest';
            res.render('error', { errMessage: err });
        });
    }
    else {
        res.locals.loggedIn = false;
        console.log('render state says im a guest');
        console.log('ARE THESE CHANGES COMPILING');
        next();
    }
}
exports.default = renderState;
//# sourceMappingURL=server-render-state.js.map