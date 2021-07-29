const auth = require("../middleware/auth")
const express = require("express");
const router=express.Router();
const { User,validateUser } =require("../models/User")
const _=require("lodash")
const bcrypt = require("bcrypt")


router.get("/me",auth, async (req,res)=>{
    const user= await User.findById(req.user._id).select({password:0})
    res.send(user)
})

router.post("/",async (req,res)=>{
    const check = validateUser.validate(req.body);
    if(!check.error)
    {
        let user = await User.findOne({email:req.body.email});
        if(user) 
        {
           return res.send("User already registered")
        }
        

        user = new User(_.pick(req.body,["name","email","password"]))

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);

        await user.save()
        const token = user.generateAuthToken();
       
        res.header("x-auth-token",token).send(_.pick(user,["name","email","_id"]))
    }
    else{
        res.status(400).send(check.error)
    }

})





module.exports = router
 
