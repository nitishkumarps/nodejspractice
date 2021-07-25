//IMPORTS

const express = require("express")
const router = express.Router();
const { Customer,validateCustomer } = require("../models/Customer")



//GET ALL CUSTOMERS
router.get("/",async (req,res)=>{
    const customers = await Customer.find().sort({name:1})
    res.send(customers)
})

//ADD A CUSTOMER
router.post("/",async (req,res)=>{
    const check=validateCustomer.validate(req.body)
    if(!check.error)
    {
        const customer = new Customer({
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        })
        const result = await customer.save()
        res.send(result)
   
    }
    else
    {
        res.status(400).send(check.error)
    }
     
})

//UPDATE A CUSTOMER

router.put("/:id",async (req,res)=>{
    const check=validateCustomer.validate(req.body)
    if(!check.error)
    {
        const result = await Customer.findOneAndUpdate(req.params.id,{
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
        },{new:true})
        if(!result) res.status(404).send("Data not found")
        res.send(result)
    }
    else
    {
        res.status(400).send(check.error)
    }

})

//DELETE A CUSTOMER
router.delete("/:id",async (req,res)=>{
    const result = await Customer.findOneAndDelete(req.params.id)
    if(!result) res.status(404).send("Data not found")
    res.send(result)

} )

//GET A CUSTOMER BY ID
router.get("/:id",async (req,res)=>{
    const result = await Customer.find({_id:req.params.id})
    if(!result) res.status(404).send("Data not found")
    res.send(result)

} )

module.exports = router