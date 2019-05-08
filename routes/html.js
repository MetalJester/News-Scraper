const cheerio = require('cheerio');
const db = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = function (app) {
    app.get("/", function (req, res) {

        db.Article.find({}).then(function (results) {
            console.log(results);
            res.render('home', { Article: results });
        }).catch(function (err) {
            res.send("An error occurred").render('home');
        });        
    });
}