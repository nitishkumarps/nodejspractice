const winston = require("winston")

module.exports = function (error,req,res,next){
    winston.error(error.message,error)
    res.status(500).send("Error Occured")

    //DIFFENT LEVEL OF LOGGING
    //error
    //warn
    //info
    //verbose
    //debug
    //silly

}