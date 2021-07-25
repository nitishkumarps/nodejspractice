const mongoose = require("mongoose");
const joi=require("joi");

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlenght:3,
        maxlength:75
    }
})

const validateGenre = joi.object({
    name:joi.string().required().min(5).max(75)
})

const Genre = mongoose.model("Genres",genreSchema)

exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema