const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

let categorySchema = new Schema({
    name: String
});

module.exports = mongoose.model("category", categorySchema);