const mongoose = require("mongoose")
const sending_msg = new mongoose.Schema({
Username:String,
msg_date:String,
  msg:String

})

module.exports=mongoose.model("msg",sending_msg,"messages");
