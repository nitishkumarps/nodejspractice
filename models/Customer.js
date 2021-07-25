const mongoose = require("mongoose")
const Joi = require("joi")

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isGold:{
        type:Boolean,
        required:true,
        default:false
    }
})

const Customer = mongoose.model("customers",customerSchema);

const validateCustomer = Joi.object({
    name:Joi.string().required(),
    phone:Joi.string().required(),
    isGold:Joi.boolean().required()
})

exports.Customer = Customer;
exports.validateCustomer = validateCustomer