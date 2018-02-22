"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailerExpressHandlebars = require('nodemailer-express-handlebars');
var nodemailer = require('nodemailer');
var handlebars = require('express-handlebars');
var path = require('path');
var express = require("express");
var router = express.Router();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'this1234567890is1234567890test@gmail.com',
        pass: 'Mapex133'
    }
});
var sut = nodemailerExpressHandlebars({
    viewEngine: handlebars.create({
        extname: 'hbs',
        defaultLayout: path.resolve(__dirname, '../../views/layouts/default.hbs'),
        partialsDir: path.resolve(__dirname, '../../views/partials'),
        layoutsDir: path.resolve(__dirname, '../../views/layouts')
    }),
    viewPath: path.resolve(__dirname, '../../views'),
    extName: '.hbs'
});
transporter.use('compile', sut);
function mailer() {
    return function (req, res, next) {
        req.transporter = transporter;
        next();
    };
}
exports.mailer = mailer;
//# sourceMappingURL=emailer.js.map