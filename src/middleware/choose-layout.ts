function appLayout(req, res, next) {
    res.locals.layout = 'app'
    next();
}
export default appLayout;

