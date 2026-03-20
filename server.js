const express = require("express");

require("dotenv").config();
const cors = require("cors");
const { default: mongoose, model } = require("mongoose");
const path=require("path")


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://medlazhar15_db_user:cwQwI5SwZApw3h83@cluster0.wavxy18.mongodb.net/Mystore?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

    




 const dta_all=require("./models/User")

 const op=require("./models/User")



app.get("/account",async(req,res)=>{
  
  try{
 
 
 
    var accounts= await op.find({})

    console.log(accounts)
    res.json(accounts)
  }catch(err){
    console.log(err)
  }
})
// insert data in mongo atlas****************************************************
app.post("/insert_records",async(req,res)=>{
  try{
    const isfounded=await dta_all.findOne({Username:req.body.username})
    if(isfounded){
      res.json({message:"اختر اسم اخر"})
    }else{
const record = new dta_all({
  Username:req.body.username,
  Password:req.body.password,
  isAdmin:"false",
  name:req.body.name,
  birthday:req.body.birthday,
  phone:req.body.phone,
  adress:req.body.adress,

})
const succeed = await record.save();
if(succeed){
res.status(201).json({message:"تمت الاظافة بنجاح"})
}else{
  res.status(500).json({message:"error to insert record"})
}
    }



  }catch(err){
res.status(501).json({message:err})
  }
})
//*************************************************************************

// ******************* login  ***********************************************

app.post('/login', async (req, res) => {

  try {

    const {username,password} = req.body;

    const user = await dta_all.findOne({ Username: username });

    

    if (!user) {
      return res.json({
        success: false,
        message: "المستخدم غير موجود"
      });
    }

    if (password !== user.Password) {
      return res.json({
        success: false,
        message: "كلمة المرور خاطئة"
      });
    }else{

 return res.json({
        success: true,
        message: "تم تسجيل الدخول بنجاح"
       
    
    }) }

    

  } catch (err) {

    console.log(err);

    res.json({
      message: "مشكلة"
    });

  }

});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
