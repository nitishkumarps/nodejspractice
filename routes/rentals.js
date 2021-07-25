const express = require("express");
const router=express.Router();
const { Rental,validateRental } = require("../models/rental")
const { Customer} =  require("../models/Customer")
const mongoose =  require("mongoose")
const { Movie } = require("../models/movies")
const Fawn = require("fawn");

Fawn.init(mongoose)


//ADD RENTAL
router.post("/",async (req,res)=>{
    const check = validateRental.validate(req.body);
    if(!check.error)
    {
        try {
            const customer= await Customer.findById(req.body.customerId)
            const movie = await Movie.findById(req.body.movieId)
            const rental = new Rental({
                customer:{
                    _id:customer._id,
                    name:customer.name,
                    phone:customer.phone,
                    isGold:customer.isGold
                },
                movie:{
                    _id:movie._id,
                    title:movie.title,
                    dailyRentalRate:movie.dailyRentalRate
                }
            })
            try
            {
                new Fawn.Task().save("rentals",rental)
                .update("movies",{_id:movie._id},{
                    $inc:{numberInStock:-1}
                })
                .run()
                res.send(rental)
            }
            catch(error){
                res.status(500).send(error.message)
            }
           

        }
        catch(error){
            res.status(400).send(error.message)
        }

    }
    else{
        res.status(400).send("Invalid Request")
    }
})

// GET ALL RENTALS

router.get("/",async (req,res)=>{
    const result = await Rental.find();
    res.send(result)
})

module.exports = router