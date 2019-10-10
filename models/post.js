var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", postSchema);