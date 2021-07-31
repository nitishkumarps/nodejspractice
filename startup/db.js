const winston = require('winston');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()
module.exports = function() {
  //mongoose.connect('mongodb://localhost/vidly') //FOR LOCAL
  mongoose.connect(process.env.vidlyMongodbString)
    .then(() => winston.info('Connected to MongoDB...'));
}