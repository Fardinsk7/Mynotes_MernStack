const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const JWT_SECRET = "Fardinsk.7"
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')



//Route one for creating new user
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async(req,res)=>{
    console.log(req.body);
    let success = false
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }

    try{
    let user = await User.findOne({email:req.body.email})
    if(user){
        
        return res.status(400).json({success,error:"Sorry user with this email already exist"})
    }

    // const salt = await bcrypt.getSalt(7,(err)=>{
    //     console.log(err)
    // })
    const secondPass = await bcrypt.hash(req.body.password,10)

   

    user = await User.create({
        name: req.body.name,
        password: secondPass,
        email: req.body.email
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET)

    success= true;
    res.json({success,authToken})
}
    catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
    // res.send(req.body)
    
    

})

// ------------Route 2: Creating Login Endpoint --------------------

router.post('/login',[
    // body('name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Please check the lenght password').isLength({min:5})
],async(req,res)=>{
    let success = false
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false
            return res.status(404).json({error:"Please Enter Proper Credential"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success = false
            return res.status(404).json({error:"Please Enter Proper Credential"})
            
        }
        
        const payload = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(payload,JWT_SECRET)
        
        // console.log(authToken)
        let success = true
        res.json({success,authToken})


        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
        
    }

})


//Route 3: Getting loggedin user detail

// Yaha par fetcherUser ek middleware (middleware fuction) jo ki ek most used function hota hai aur koi bhi file me use ho sakta hai toh isliye isko ek seperate file se import karte hai 
router.post('/getuser',fetchUser, async (req,res)=>{

    try {
        const userId =req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!!")
        
    }

})



module.exports = router