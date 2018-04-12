// const https = require('https');
// const http = require('http');
import * as fs from "fs"; // only using with https
import * as express from "express";
import * as bodyParser from "body-parser";
import * as hbs from "express-handlebars";
import * as path from "path";
import * as session from "express-session";
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import index from './index'
import { dbConfig } from "./services/db-connect-config";
import { init } from './middleware/database'
import renderState from './middleware/server-render-state';
import sessionCheck from "./middleware/session-check";
import * as e from './services/error-handling';

const app = express();

app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true,limit:'50kb'}));
app.set('view engine', "hbs");
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout:__dirname + './../views/layouts/website.hbs',
  partialsDir:__dirname + './../views/partials',
  layoutsDir:__dirname + './../views/layouts'
}));
app.set('views', path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, './public')));
app.set('trust proxy', 1);

app.use(init(dbConfig));
app.options('*', cors())
app.use(cors())
//session using memory storage for now. Will not be the case in production. see readme session stores
app.set('trust proxy', 1) // necessary of server is behind a proxy and using secure:true for cookie
app.use(session({
  name:'id',
  secret: 'this is my secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly:true,
      // secure: true // will not send cookie unless https connection is established
    },
  })
);


app.use(sessionCheck);
app.use(renderState);
app.use('/', index)



// ERROR STUFF

app.use(function(req, res, next) { 
  res.status(404);
  res.render('error', { 
    errName: null, 
    errMessage: "We couldn't find this page.",
    layout:'react'
  });
});

app.use(function (err:Error, req:express.Request, res:express.Response, next:express.NextFunction) {
  if (err.name === 'PayloadTooLargeError' ) {
    res.status(413);
    res.render('error', { 
      errName: err.message,
      errMessage: "You entered something over 50kb. Please make your inputs are smaller and try again." ,
      layout:'react'
    });
  } else if (err.name === 'ReferenceError') {
    res.status(500);
    res.render('error', { 
      errName: err.message,
      errMessage: "Something was missing." ,
      layout:'react'
    });
  } else if (e.serverErrorFileNotFound.test(err.message)) {
    res.status(404)
    res.render('error', { 
      number: "404", // only because 404 is well-known to users
      errName: err.message, 
      errMessage: "Could not find this page!",
      layout:'react'
    })
  } else {
    res.status(500);
    res.render('error', { 
      errName: err.message,
      errMessage: null ,
      layout:'react'
    });
  }
})

// production
// app.listen(8000, '172.31.31.153')

// localhost
app.listen(8000, 'localhost', function() {
  console.log('app is running')
})

// // easy switch to https
// http.createServer({
//    key: fs.readFileSync('key.pem'),
//    cert: fs.readFileSync('cert.pem'),
//    passphrase: 'Mapex133'
//  },
//   app).listen(3000, function () {
//    console.log('App running');
//  });
