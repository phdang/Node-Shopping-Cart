const process = require("../config/env");
const mongoose = require("mongoose");
//run on node must be replaced by string in nodemon.json or error promise return with no catch 30mins wasted :((
mongoose.connect(process.env.MONGO_CONNECT_URI);

const Product = require("../models/product");
const products = [
  new Product({
    _id: mongoose.Types.ObjectId(),
    title: "Harry Porter",
    desc: "Super cool - at least as a child",
    price: 12,
    img: "http://ecx.images-amazon.com/images/I/51ZU%2BCvkTyL.jpg"
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    title: "A Song of Ice and Fire - A Storm of Swords",
    desc: "No one is gonna survive!",
    price: 9.99,
    img: "http://www.revelationz.net/images/book/gameofthrones3.jpg"
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    title: "Lord of the Rings",
    desc: "I find the movies getting better",
    price: 13.99,
    img: "http://d.gr-assets.com/books/1411114164l/33.jpg"
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    title: "A Song of Ice and Fire - Game of Thrones",
    desc: "No one is going to survive !",
    price: 15.25,
    img: "http://ecx.images-amazon.com/images/I/919-FLL37TL.jpg"
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    title: "A Song of Ice and Fire - A Feast for Crows",
    desc: "Still no one is going to survive !",
    price: 10.99,
    img:
      "http://www.georgerrmartin.com/wp-content/uploads/2012/08/feastforcrows.jpg"
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    img: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Gothic Video Game",
    desc: "Awesome Game!!!!",
    price: 10
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    img:
      "http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg",
    title: "World of Warcraft Video Game",
    desc: "Also awesome? But of course it was better in vanilla ...",
    price: 20
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    img:
      "https://support.activision.com/servlet/servlet.FileDownload?file=00PU000000Rq6tz",
    title: "Call of Duty Video Game",
    desc: "Meh ... nah, it's okay I guess",
    price: 40
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    img:
      "https://pmcdeadline2.files.wordpress.com/2014/02/minecraft__140227211000.jpg",
    title: "Minecraft Video Game",
    desc: "Now that is super awesome!",
    price: 15
  }),
  new Product({
    _id: mongoose.Types.ObjectId(),
    img:
      "https://d1r7xvmnymv7kg.cloudfront.net/sites_products/darksouls3/assets/img/DARKSOUL_facebook_mini.jpg",
    title: "Dark Souls 3 Video Game",
    desc: "I died!",
    price: 50
  })
];

let done = 0;

for (product of products) {
  product.save((error, reuslt) => {
    done++;
    if (products.length === done) {
      //close connection to mongoDB
      mongoose.disconnect();
    }
  });
}
