const cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/", function (req, res) {
        res.render ('home')
    });
}