const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mongoose = require("mongoose")
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');

//Create a user using: POST "/api/auth/createuser". No login required.
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
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      res.json(user)
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Some error occured")
    }
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err) 
      //   res.json({error:"Please enter unique value for email", message:err.message})})
})

module.exports = router;