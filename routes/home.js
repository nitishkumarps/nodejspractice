const express = require("express")
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("This is Node js API testing")
})

module.exports=router