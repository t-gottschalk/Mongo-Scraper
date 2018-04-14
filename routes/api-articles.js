(()=> {
    const db = require("../models");
    const request = require("request");
    const cheerio = require("cheerio");

    module.exports = app => {
        // api route for all articles from the db
        app.get("/api/articles", (req, res) => db.Article.find({}).then(data => res.json(data)).catch(err => res.json(err)));

        // api route for one article by id
        app.get("/api/articles/:id", (req, res) => db.Article.findOne({_id: req.params.id}).then(data => res.json(data)).catch(err => res.json(err)));

        // api route to save an article to favorites
        app.get("/api/articles/addsaved/:id", (req, res) => db.Article.update({_id: req.params.id}, {$set: {"saved": true}})
        .then(data => res.send(data)).catch(err => res.json(err)));

        // api route to remove an article from favorites
        app.get("/api/articles/removesaved/:id", (req, res) => db.Article.update({_id: req.params.id}, {$set: {"saved": false}})
        .then(data => res.send(data)).catch(err => res.json(err)));

        // api route to save an article to favorites
        app.get("/api/articles/addnote/:id/:author/:comment", (req, res) => db.Article.update({_id: req.params.id}, { $push: { "note": [{ "author": req.params.author, "comment": req.params.comment }]}})
        .then(data => res.send(data)).catch(err => res.json(err)));

        // api route to delete an article
        // this is just templating; no user functunality in place yet
        app.delete("/api/articles/delete/:id", (req, res) => db.Article.delete({_id: req.params.id})
        .then(data => res.json(data)).catch(err => res.json(err)));

        // Scrape articles
        app.get("/api/articles/scrape", (req, res) => {
            request("https://www.reuters.com/news/archive/technologyNews/", (error, response, html) => {
                let $ = cheerio.load(html);
                let result = {};
                $(".story").each(function (i, element) {
                    result.title = $(element).children(".story-content").children("a").children(".story-title").text().trim();
                    result.link = "https://www.reuters.com/" + $(element).children(".story-content").children("a").attr("href");
                    result.photo = $(element).children(".story-photo").children("a").children("img").attr("org-src");
                    result.description = $(element).children(".story-content").children("p").text();
                    db.Article.create(result).then(dbArticle => res.json(dbArticle)).catch(err => res.json(err));
                });
            });
        });

    };

})();  