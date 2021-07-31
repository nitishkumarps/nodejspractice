const helmet = require("helmet") // FOR PROTECTING WELL KNOW WEB VULNARABILITIES
const compression = require("compression") // COMPRESS HTTP RESPONSE SEND TO THE CLIENT

module.exports = function(app){
    app.use(helmet())
    app.use(compression())
}