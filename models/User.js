const mongoose = require("mongoose");
const joi=require("joi");
const jwt = require("jsonwebtoken")
const config=require("config")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlenght:3,
        maxlength:75
    },
    email:{
        type:String,
        required:true,
        minlenght:3,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlenght:3,
        maxlength:1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
userSchema.methods.generateAuthToken = function (){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtPrivateKey"));
    return token
}

const validateUser = joi.object({
    name:joi.string().required().min(5).max(75),
    email:joi.string().required().min(3).max(255).email(),
    password:joi.string().required().min(3).max(255)
})

const User = mongoose.model("Users",userSchema)

exports.User = User;
exports.validateUser = validateUser;
