const express = require("express");
const mongoose = require("mongoose");

const genres = require("./routes/genres")
const customers = require("./routes/customers")

const app=express();
app.use(express.json());
app.use("/api/genres",genres)
app.use("/api/customers",customers);

mongoose.connect("mongodb://localhost/vidly",{useUnifiedTopology: true,useNewUrlParser: true  }).then(res => {
console.log("Connected to Mongodb")
}).catch(error=>{
console.error("Could not connect to mongodb")
}
)


const port =process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("Listening on port ",port)
})