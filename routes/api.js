const cheerio = require('cheerio');
const db = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = function (app) {

    app.get("/api/scrape", function (req, res) {
        console.log("Scraping...");

        axios.get('https://www.huffpost.com/impact/topic/social-justice').then(function (response) {
            const $ = cheerio.load(response.data);

            let titles = $(".card__headline").toArray().map(element => $(element).children().text());
            let links = $(".card__headline").toArray().map(element => $(element).find("a").attr("href"));

            let articleObjects = [];

            // Build out the array of objects
            for (let i = 0; i < links.length; i++) {
                articleObjects.push(
                    {
                        title: titles[i] || "No Title Given",
                        link: links[i] || "No URL given"
                    }
                )
            }

            db.Article.create(articleObjects)
                .then(function (results) {
                    console.log(results);
                    res.send("Scrape Complete").end();
                }).catch(function (error) {
                    res.status(500).send("An error occurred").end();
                    console.error(error);
                });

        });

    });


}