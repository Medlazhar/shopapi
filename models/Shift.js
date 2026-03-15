const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  Message: String,
  
  
});

module.exports = mongoose.model('op',dataSchema,"operation")