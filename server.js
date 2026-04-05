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


// ******************************************** الاتصال بقاعدة البيانات  ********************************************************
mongoose.connect("mongodb+srv://medlazhar15_db_user:cwQwI5SwZApw3h83@cluster0.wavxy18.mongodb.net/Mystore?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

    


//**************************************  تعريف الموديلات ************************************

 const dta_all=require("./models/User")

 const op=require("./models/User")
const new_tayseer_op = require("./models/new_operation");
const new_tayseer_msg = require("./models/new_message");

// ***************************** تحديث قراءة الرسالة *****************************

app.post("/update_readed",async (req,res)=>{
const my_id = req.body.id;
  const update_value = await new_tayseer_msg.findById(my_id)
  if(update_value){
 update_value.readed = "true";
  update_value.save();
       res.status(201).json({message:"تم التحديث بنجاح"})
  } else {
    res.status(500).json({message:"العنصر غير موجود"})
  }
 


})

//****************************************************************************

// ***************************** تحديث قراءة الرسالة *****************************

app.post("/update_record",async (req,res)=>{

  const da = req.body;

  const update_value = await dta_all.findById(req.body.id)
  if(update_value){
 update_value.Username= da.username;
    update_value.Password= da.password;
    update_value.isAdmin= da.isAdmin;
    update_value.adress= da.adress;
    update_value.phone= da.phone;
    update_value.birthday= da.birthday;
      update_value.name= da.name;
  update_value.save();
       res.status(201).json({message:"تم التحديث بنجاح"})
  } else {
    res.status(500).json({message:"العنصر غير موجود"})
  }
 


})

//****************************************************************************


















// remove messages 
app.post('/remove_msg', async (req, res) => {
    try {
        const deletedUser = await new_tayseer_msg.findByIdAndDelete(req.body.id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "الرسالة غير موجودة" });
        }
        
        res.status(200).json({ message: "تم الحذف بنجاح", data: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "حدث خطاء في السيرفر", error: error.message });
    }
});












// ***************************** ارسال رسالة الى الادمن ********************************************
app.post("/new_message",async(req,res)=>{
  try{
   
        const record = new new_tayseer_msg({
        Username:req.body.username,
        msg_date:req.body.msg_date,
        msg:req.body.msg,
          readed : "false"
 
      })
          const succeed = await record.save();
                if(succeed){
                                res.status(201).json({message:"تم ارسال الرسالة بنجاح"})
                            }else{
                                      res.status(500).json({message:"error to insert record"})
                                    }
    }catch(err){
res.status(501).json({message:err})
  }
})
//*************************************************************************


// get all messages 
app.get("/messages",async(req,res)=>{
    try{
 
 var operations= await new_tayseer_msg.find({})
  
    res.json(operations)
  }catch(err){
    console.log(err)
  }
})








// new operation ادراج عملية جديدة 
app.post("/new_operation",async(req,res)=>{
  try{
   
const record = new new_tayseer_op({
  Username:req.body.username,
  op_bigin:req.body.op_bigin,

  op_end:req.body.op_end,
  caisse:req.body.caisse,
  worktime:req.body.worktime
 

})
const succeed = await record.save();
if(succeed){
res.status(201).json({message:"تمت الاظافة بنجاح"})
}else{
  res.status(500).json({message:"error to insert record"})
}
    }catch(err){
res.status(501).json({message:err})
  }
})
//*************************************************************************



// ************************* جلب جميع العمليات لتسجيل معين ******************************************
//********************************************************************************************
app.get("/operations",async(req,res)=>{
    try{
 
 var operations= await new_tayseer_op.find({})
  
    res.json(operations)
  }catch(err){
    console.log(err)
  }
})


//**********************************************************************************************

// ************************* جلب جميع العمليات لتسجيل معين ******************************************
//********************************************************************************************
app.post("/one_operations",async(req,res)=>{
try{
 const {username}= req.body;
 var operations= await new_tayseer_op.find({Username:username})
  
    res.json(operations)
  }catch(err){
    console.log(err)
  }
})


//**********************************************************************************************














//************************************* جلب جميع الحسابات *******************************************
//***********************************************************************************************
app.get("/account",async(req,res)=>{
    try{
 
 var accounts= await op.find({})
  console.log(accounts)
    res.json(accounts)
  }catch(err){
    console.log(err)
  }
})









// delete record ************************* حذف تسجيل ****************************************
//******************************************************************************************
app.post("/delete_user",async(req,res)=>{
   const dta_all=require("./models/User")
try {
  const {id}= req.body
        const deletedUser = await dta_all.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "العنصر المراد حذفه غير موجود" , success: "false"});
        }
        
        res.status(200).json({ message: "تمت عملية الحذف بنجاح", success: "true" });
    } catch (error) {
        res.status(500).json({ message: error.message , success: "error" });
    }

})

//*******************************************************************************************************************
//*******************************************************************************************************************








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
