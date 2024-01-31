const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserModal=require('./modals/user.js')
// const fileModal=require('./modals/files.js')
// const fileUpload = require('multer');
const cors= require("cors")
// const authRoutes = require('./routes/auth');
// const fileRoutes = require('./routes/file');

dotenv.config();
const app = express();
const multer=require('multer')
const path=require("path")
mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(express.json());
app.use(cors());

const storage=multer.diskStorage({
 destination:(req,file,cb)=>{
  cb(null,'public/files')
 },
 filename:(req,file,cb)=>{
  cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
 },
})

const upload=multer({
  storage:storage
})

app.post("/upload",upload.single("file") ,(req,res)=>{
  UserModal.create({files: req.file.filename}).then(result=>res.json(result)).catch(err=>res.json(err))
})

app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  UserModal.findOne({email}).then(user=>{
    if(user){
      if(user.password === password){
        res.json("Success")
      }else{
        res.json("password is incorrect")
      }
    }else{
      res.json("user does not exist please SignUp first")
    }
  }
    )
});
app.post("/register",(req,res)=>{
    UserModal.create(req.body).then(User=>res.json(User)).catch(err=>res.json(err))
})
// app.use('/uploads', express.static('uploads'));

// app.use('/auth', authRoutes);
// app.use('/file', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
