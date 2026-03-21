const mongoose = require('mongoose');
const operations = new mongoose.Schema({
  Username: String,
  op_date: String,
  op_time: String,
  caisse:String,
  op_endtime:String,
  op_worktime:String,
 
  
});

module.exports = mongoose.model('data',operations,"operation")
