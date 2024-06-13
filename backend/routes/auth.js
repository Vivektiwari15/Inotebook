const express = require("express")
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const fetchuser  = require("../middleware/fetchuser")

const secretKey = "d%$D^Sd77a^ds*7s&87D6"

router.get("/",(req,res)=>{
    res.status(200).send(req.body)
})

router.post("/",[
    body('name',"Invalid Name").isLength({ min: 3 }),
    body('email',"Invalid Email").isEmail(),
    body('password',"Invalid Password").isLength({ min: 5 })
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false,error: "password must be greater than 5" });
    }

   let user= await User.findOne({email:req.body.email})

    if(user){
        return res.status(404).json({success:false,error:"User aleary exits"})
    }

    const salt = await bcrypt.genSalt(10)
    const securePassword  = await bcrypt.hash(req.body.password,salt)

    user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      })
      const data = {
        user:{
          id:user._id
        }
      }
      const authToken = jwt.sign(data,secretKey)
      res.json({authToken,success:true})
})


router.post("/login",[
    body('email',"Invalid Email").isEmail(),
    body('password',"Invalid Email").exists()
  ],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body

    try {

      let user  = await User.findOne({email:email})
    
      if(!user){
        return res.status(404).json({error:"Invalid Email or Password"})
      }
 
      
      const passwordCompare = await bcrypt.compare(password,user.password)
   
      if(!passwordCompare)
      {
        return res.status(404).json({success:false,error:"Invalid Email or Password"})
      }

      const data = {
        user:{
          id:user._id
        }
      }
      const authToken = jwt.sign(data,secretKey)

      res.json({authToken,success:true})

    } catch (error) {
      return res.status(404).send(error)
    }
  
})

router.get("/getuser",fetchuser,async (req,res)=>{

    try {

      userId = req.user.id
      const user = await User.findById(userId).select("-password")
      res.send(user)
       } catch (error) {
      return res.status(401).send(error)
    }
  
})

module.exports = router