
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        name: String,
        password: String,
    },
    {
        collection: "users"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Users", usersSchema);