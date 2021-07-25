
const express = require("express");
const router=express.Router();
const { Genre,validateGenre } =require("../models/Genre")




router.get("/",async (req,res)=>{
const genres = await Genre.find().sort({name:1});
res.send(genres)
}) 

router.post("/",async (req,res)=>{
    const check = validateGenre.validate(req.body);
    if(!check.error)
    {
        const genre = new Genre({
            name:req.body.name
        })
       const result = await genre.save();
       res.send(result)
    }
    else
    {
        res.status(400).send("Send Data apporpriately")
    }
})

router.put("/:id",async (req,res)=>{

    const check = validateGenre.validate(req.body)
    if(!check.error)
    {
        const genre= await Genre.findByIdAndUpdate(req.params.id,{
            name:req.body.name
        },{
            new:true
        })
        res.send(genre)
    }
    else
    {
        res.status(400).send("Send Data apporpriately")
    }
    
})

router.delete("/:id",async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) res.status(404).send("Data not found")
    res.send(genre)
})  

router.get(":/id",async (req,res)=>{
    const genre = Genre.findById(req.params.id)
    if(!genre) res.status(404).send("Data not found")
    res.send(genre)
})

module.exports = router