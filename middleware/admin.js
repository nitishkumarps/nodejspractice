module.exports = function (req,res,next){
    if(!req.isAdmin) return res.status(403).send("Access denied.")

    next()
}