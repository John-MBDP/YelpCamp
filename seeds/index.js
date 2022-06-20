const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62a280e14a37add39d6cadbf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dgdkfr0yi/image/upload/v1655136045/YelpCamp/mmnvwji0tilscsazefkb.jpg",
          filename: "YelpCamp/mmnvwji0tilscsazefkb",
        },
      ],
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, iusto.",
      price,
      geometry: { type: 'Point', coordinates: [
        cities[random1000].longitude, 
        cities[random1000].latitude ], 
      }
    });
    await camp.save();
  }
};

seedDB().then(() => {
  console.log("Closing Connection");
  mongoose.connection.close();
});
