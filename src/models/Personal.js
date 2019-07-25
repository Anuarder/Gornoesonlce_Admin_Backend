
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalSchema = new Schema(
    {
        name: String,
        phone: String
    },
    {
        collection: "personal"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Personal", personalSchema);