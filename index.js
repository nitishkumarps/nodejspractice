
const express = require("express");
const Joi = require("joi");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());// MIDDLEWARE FOR POST OBJECT
// DATABASE - PLAYGROUND

mongoose.connect("mongodb://localhost/mongo-exercises",{useUnifiedTopology: true,useNewUrlParser: true  }).then(res => {
console.log("Connected to Mongodb")
}).catch(error=>{
console.error("Could not connect to mongodb")
}
)
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
})

//COLLECTION NAME - Courses
const Course = mongoose.model('Courses',courseSchema); //CREATING A CLASS USING SCHEMA
 
const createNewCourse = async ()=>{

    const course = new Course({
        name:"Angular js course",
        author:"DEF",
        tags:["Angular","backend"],
        isPublished:true
    })
    
    //SAVING THE DATA IN THE DB
    const result = await course.save();
    console.log(result);
    
}

//createNewCourse()

const getCourses = async () =>{
const courses = 
await Course.find({isPublished:true
    })
.select({name:1,author:1,_id:0})
    console.log(courses);
}

//getCourses();

const updateCourse = async (author) =>{
    const coursefound = await Course
    .updateMany({author:author},{$set:{
     author:"New Author",
     isPublished:false   
    }
    })
    console.log(coursefound)
}
//updateCourse("Mosh")

const removeCourse = async (author)=>{
    const result = await Course.deleteOne({author:author})
    console.log(result);
}

//removeCourse("Jack")






// //Data
// let courses=[{
//     id:1,coursename:"course1",
// },
// {
// id:2,coursename:"course2"
// },
// {
// id:3,coursename:"course3",
// },
// {
// id:4,coursename:"course4",
// }]

// const schema=Joi.object({
//     name:Joi.string().min(3).required()
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/api/allcourses", (req, res) => {
//   res.send(courses);
// });

// app.get("/api/courses/:id", (req, res) => {
//     let found=courses.find(e=>e.id === parseInt(req.params.id));
//     if(!found)
//     return res.status(404).send("the course with the given does not exist");
//     else
//     return res.send(found)
// });

// app.post("/api/courses",(req,res)=>{

// const result=  schema.validate(req.body)
// console.log(result)
// if(!result.error)
// {
//     const course={
//         id:courses.length +1,
//         name:req.body.name
//     };
//     courses.push(course);
//     res.send(course)
     
// }
// else{
//     res.status(400).send(result.error.details)
// }


// })
// app.put("/api/updatecourses/",(req,res)=>{
 
// const result = schema.validate(req.body)

// if(!result.error)
// {
// const found=courses.find(e=>e.id === parseInt(req.query.id))
// if(!found)
// {
//     res.status(400).send("Object not found");
// }
// else
// {
//     found.coursename=req.body.name;
//     res.send(found);
// }
// }
// else{
// res.status(400).send(result.error)
// }

// })

// app.delete("/api/courses/:id",(req,res)=>{
//     let found=courses.find(e=>e.id === parseInt(req.params.id));
//     if(!found)
//     {
//         res.status(400).send("Object not found");

//     }
//     courses = courses.filter(e=>e.id !== parseInt(req.params.id));
//     res.send(courses)
// });




// app.get("/api/posts/:year/:month", (req, res) => {
//     res.send(req.query);
//   });

//   app.get("/api/posts/:year/:month", (req, res) => {
//     res.send(req.params);
//   });

// // PORT
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("Listening on port ", port);
// });
