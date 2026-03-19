const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  isAdmin: String,
  name:String,
  birthday:String,
  phone:String,
  adress:String
  
});

module.exports = mongoose.model('data',dataSchema,"Users")
