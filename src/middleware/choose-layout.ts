function appLayout(req, res, next) {
    res.locals.layout = 'app'
    console.log('choose layout running')
    next();
}
export default appLayout;

