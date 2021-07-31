const config = require('config');

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
  if(!config.get('MongodbString')){
    throw new Error("FATA ERROR: MongodbString not defined")
  }
}