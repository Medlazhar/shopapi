const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  isAdmin: String,
  
});

module.exports = mongoose.model('data',dataSchema,"Users")