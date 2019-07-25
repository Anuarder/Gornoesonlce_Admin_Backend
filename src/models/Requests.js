
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestsSchema = new Schema(
    {
        name: String,
        phone: String,
        date: String,
        status: Boolean,
        personal: String
    },
    {
        collection: "requests"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Requests", requestsSchema);