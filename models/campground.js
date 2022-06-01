const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  addresses: [
    { name: String, location: String },
    { name: String, address: String },
  ],
});

module.exports = mongoose.model("Campground", CampgroundSchema);
