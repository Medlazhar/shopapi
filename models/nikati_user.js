const mongoose = require('mongoose');
const nikati = new mongoose.Schema({
  email: String,
  android_ID: String,
  is_checked: Boolean,

  
});

module.exports = mongoose.model('nikati',nikati,"Nikati_Users")
