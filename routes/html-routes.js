(() => {
  const db = require("../models");

  module.exports = app => {
    // root route works the same as index
    app.get("/", (req, res) => db.Article.find({}).sort({ _id: -1 })
    .then(data => res.render("index", {new: data})).catch(err => res.json(err)));

    // index route renders all articles in db
    app.get("/index", (req, res) => db.Article.find({}).sort({ _id: -1 })
    .then(data => res.render("index", {new: data})).catch(err => res.json(err)));

    // favorites route only renders saved articles
    app.get("/favorites", (req, res) => db.Article.find({}).sort({ _id: -1 }).then(data => {
      let saved = [];
      data.forEach(element => {
        if (element.saved === true) saved.push(element)
      })
      res.render("favorites", {saved: saved})
    }));

  };

})();