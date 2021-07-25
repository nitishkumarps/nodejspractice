
const express = require("express");
const router=express.Router();
const { Movie,validateMovie } =require("../models/movies")
const { Genre } =require("../models/Genre")





//GET ALL MOVIES
router.get("/",async (req,res)=>{
    const movies = await Movie.find().sort({title:1})
    res.send(movies)
})

//ADD A MOVIE
router.post("/",async (req,res)=>{
    const check=validateMovie.validate(req.body)
    if(!check.error)
    {
        let data=req.body;
        try{
            let genre = await Genre.findById(data.genreId);
            if(genre)
        {
            const movie = new Movie({
                title:data.title,
                genre:{
                    _id:genre._id,
                    name:genre.name
                },
                numberInStock:data.numberInStock,
                dailyRentalRate:data.dailyRentalRate
            })
            const result = await movie.save()
            res.send(result)
        }
        else{
            res.status(404).send("Genre not found")
        }
        }
        catch(error){
            res.status(400).send("Genre not found")
            console.log(error.message)
        }
       
        
        
   
    }
    else
    {
        res.status(400).send(check.error)
    }
     
})

//UPDATE A MOVIE

router.put("/:id",async (req,res)=>{
    const check=validateMovie.validate(req.body)
    if(!check.error)
    {
        let data=req.body;
        const result = await Movie.findOneAndUpdate(req.params.id,{
           ...data
        },{new:true})
        if(!result) res.status(404).send("Data not found")
        res.send(result)
    }
    else
    {
        res.status(400).send(check.error)
    }

})

//DELETE A MOVIE
router.delete("/:id",async (req,res)=>{
    const result = await Movie.findOneAndDelete(req.params.id)
    if(!result) res.status(404).send("Data not found")
    res.send(result)

} )

//GET A MOVIE BY ID
router.get("/:id",async (req,res)=>{
    const result = await Movie.find({_id:req.params.id})
    if(!result) res.status(404).send("Data not found")
    res.send(result)

} )

module.exports = router