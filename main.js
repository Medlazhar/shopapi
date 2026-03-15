const express = require("express");

require("dotenv").config();
const cors = require("cors");
const { default: mongoose, model } = require("mongoose");

var singleDocument

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));



 const dta_all=require("./models/User")


  // login to database 
  app.post('/login',async(req,res)=>{
  
    const lgdata=req.body;
     console.log(lgdata.username+" / pass= "+lgdata.password)
      const query = { Username: lgdata.username };
     console.log(query)
    singleDocument = await dta_all.find(query);
        console.log(singleDocument)
      if(singleDocument!=null){
          
             if(lgdata.password == singleDocument.Password){
           console.log("login succeed")
        res.json({ success: true, message: "  Login succeed ....:)" });
   
    
    }else{
        console.log("login error")
     return res.json({ success: null, message: " اسم المستخدم او كلمة المرور خاطئة" });
           
    }
  }else{
     console.log("login error")
     return res.json({ success: null, message: " اسم المستخدم او كلمة المرور خاطئة" });
        
  }
  
  
    
  })








  const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});