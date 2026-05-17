const mongoose = require('mongoose');
const operat= new mongoose.Schema({
  Username: String,
  op_bigin: Date,
  op_end: Date,
  caisse:String,
  worktime:String
 
 
  
});

module.exports = mongoose.model('op',operat,"operations")
