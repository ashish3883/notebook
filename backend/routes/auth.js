const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//this should be in a safe place. Like config or .env file
const JWT_Secret = 'Ashishisagoodb#oy'

//Route 1: Create a user using: POST "/api/auth/createuser". No login required.
router.post("/createuser",[
    body('email', "Enter valid email").isEmail(),
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('password', "Enter valid password").isLength({ min: 5 }),
], async (req, res)=>{
    //If there are errors, request bad request & errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exist already
    try {      
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error:"Sorry user with same email already exist"})
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      //Create User
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user:{
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_Sercret);
      
      res.send({authToken})
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Some error occured")
    }
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err) 
      //   res.json({error:"Please enter unique value for email", message:err.message})})
})

//Route 2: Authenticate a user using: POST "/api/auth/login". No login required.
router.post("/login",[
    body('email', "Enter valid email").isEmail(),
    body('password', "Password cannot ber blank").exists(),
], async (req, res)=>{
    //If there are errors, request bad request & errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please enter correct creds"})
      }
      const passwordCompare = await bcrypt.compare(password, user.password);

      if(!passwordCompare){
        return res.status(400).json({error:"Please enter correct creds"})
      }
      const data = {
        user:{
          id: user.id
        }
      }     
      const authToken = jwt.sign(data, JWT_Secret);
      
      res.send({authToken})
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Some error occured")
    }
  })

//Route 3: Get user details using: POST "/api/auth/getuser". Login required.
router.post("/getuser", fetchuser, async (req, res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Some error occured")
  }
})

module.exports = router;