const mongoose = require("mongoose");
const Joi=require("joi");

const rentalSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            isGold:{
                type:Boolean,
                default:0
            },
            phone:{
                type:String,
                required:true
            }
        })
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true
            },
            dailyRentalRate:{
                type:Number,
                min:0,
                max:255
            }
        })
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date

    },
    rentalFee:{
        type:Number,
        min:0
    }
})

const Rental=mongoose.model("Rentals",rentalSchema);

const validateRental = Joi.object({
    customerId:Joi.string().required(),
    movieId:Joi.string().required()
})

exports.Rental= Rental
exports.validateRental = validateRental
