const express = require("express");
const router=express.Router();
const jwt = require("jsonwebtoken")
const config=require("config")
const { User, validateUser } =require("../models/User")
const _=require("lodash")
const bcrypt = require("bcrypt")
const joi = require("joi")



const validateAuth = joi.object({
    email:joi.string().required().min(3).max(255).email(),
    password:joi.string().required().min(3).max(255)
})

router.post("/",async (req,res)=>{
    const check = validateAuth.validate(req.body);
    if(!check.error)
    {
        let user = await User.findOne({email:req.body.email});
        if(!user) 
        {
           return res.status(400).send("Invalid email or password")
        }
        //CHECKING PASSWORD
        const validPassword = await bcrypt.compare(req.body.password,user.password)

        if(!validPassword)
        {
            return res.status(400).send("Invalid email or password")
        }
        //GENERATING WEB TOKEN
        const token = user.generateAuthToken();
        res.send(token)
    }
    else{
        res.status(400).send(check.error)
    }

})





module.exports = router