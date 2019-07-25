
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apartmentsSchema = new Schema(
    {
        number: Number,
        image2D: String,
        image3D: String,
        isSold: Boolean,
        area: Number,
        room: Number,
        floor: Number,
        block: Number
    },
    {
        collection: "newApartments"
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("Apartments", apartmentsSchema);