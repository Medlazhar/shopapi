const mongoose = require('mongoose');
const operations = new mongoose.Schema({
  Username: String,
  op_bigin: String,
  op_end: String,
  caisse:String,
  worktime:String
 
 
  
});

module.exports = mongoose.model('op',operations,"operations")
