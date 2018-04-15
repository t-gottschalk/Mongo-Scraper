(() => {
	const bodyParser = require("body-parser");
	const express = require("express");
	const mongoose = require("mongoose");
	const app = express();
	const exphbs = require("express-handlebars");
	const db = require("./models");
	const PORT = process.env.PORT || 3000;
	const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use(express.static(__dirname + "/public"));
	require("./routes/html-routes.js")(app);
	require("./routes/api-articles.js")(app);

	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");

	mongoose.Promise = Promise;
	mongoose.connect(MONGODB_URI);

	app.listen(PORT, function() {
		console.log("App is running on port " + PORT + "!");
	});
})();
