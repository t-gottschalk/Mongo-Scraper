(()=>{
    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        link: {
            type: String,
            required: true
        },
        photo: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        saved: {
            type: Boolean,
            default: false,
            required: true
        },
        note: [{
            comment: {
                type: String,
                required: true
            },
            author: {
                type: String,
                default: "Anonymous"
            }
        }]
    });

    const Article = mongoose.model("Article", ArticleSchema);
    module.exports = Article;
})();