const mongoose = require("mongoose");
const joi=require("joi");
const { genreSchema } = require("./Genre")
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
   title:{
       type:String,
       required:true
   },
   genre:{
       type:genreSchema,
       required:true,
       ref:"Genres"
   },
   numberInStock:{
       type:Number,
       default:0
   },
   dailyRentalRate:{
       type:Number,
       default:0
   }
})

const validateMovie = joi.object({
    title:Joi.string().required(),
    genreId:Joi.string().required(),
    numberInStock:Joi.number(),
    dailyRentalRate:Joi.number()
})

const Movie = mongoose.model("Movies",movieSchema)

exports.Movie = Movie;
exports.validateMovie = validateMovie