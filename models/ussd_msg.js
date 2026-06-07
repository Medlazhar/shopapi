const mongoose = require("mongoose")
const ussd_msg = new mongoose.Schema({

  "ussd_command":String,
  "status": String,
  "response": String


})

module.exports=mongoose.model("ussd_msg",ussd_msg,"USSD_Messages");