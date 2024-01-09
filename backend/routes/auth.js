const express = require('express');
const router = express.Router();
const User = require('../models/User')
const mongoose = require("mongoose")
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');

router.post("/",[
    body('email', "Enter valid email").isEmail(),
    body('name', "Enter valid name").isLength({ min: 3 }),
    body('password', "Enter valid password").isLength({ min: 5 }),
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log(err) 
        res.json({error:"Please enter unique value for email", message:err.message})})
})

module.exports = router;