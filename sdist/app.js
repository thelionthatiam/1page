"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");
var path = require("path");
var session = require("express-session");
var methodOverride = require("method-override");
var cors = require("cors");
var index_1 = require("./index");
var db_connect_config_1 = require("./services/db-connect-config");
var database_1 = require("./middleware/database");
var app = express();
app.use(express.static(path.join(__dirname, './public/rollup')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50kb' }));
app.set('view engine', "hbs");
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: __dirname + './../views/layouts/default.hbs',
    partialsDir: __dirname + './../views/partials',
    layoutsDir: __dirname + './../views/layouts'
}));
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, './public')));
app.set('trust proxy', 1);
app.use(database_1.init(db_connect_config_1.dbConfig));
// for cross origin fetch
app.options('*', cors());
app.use(cors());
//session using memory storage for now. Would not be the case in production.
app.set('trust proxy', 1); // necessary of server is behind a proxy and using secure:true for cookie
app.use(session({
    name: 'id',
    secret: 'this is my secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
    },
}));
app.use('/', index_1.default);
// ERROR STUFF
// app.use(errors)
// localhost
app.listen(4000, 'localhost', function () { return console.log('start'); });
//# sourceMappingURL=app.js.map