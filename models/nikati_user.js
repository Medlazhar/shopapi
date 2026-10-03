const mongoose = require('mongoose');
const nikati = new mongoose.Schema({
  email: String,
  android_id: String,
  is_verified: Boolean,

  
});

module.exports = mongoose.model('nikati',nikati,"Nikati_Users")
