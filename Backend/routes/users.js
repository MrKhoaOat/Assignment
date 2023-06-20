
var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User =  require('../models/user')
const auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', async(req, res) => {
  const prod =  await User.find({});
   res.status(200).send(prod);
 })

 router.post('/register', async(req, res)  => {
  try{
    const {username,password,email} = req.body;
    if(!(email && username && password )) {
      res.status(400).send("All input is require.");
    }

    const oldUsername = await User.findOne({username});
    if(oldUsername){
      return res.status(409).send("Please change username.");
    }

    const oldEmail = await User.findOne({email});
    if(oldEmail){
      return res.status(409).send("Please change email.");
    }

    const encryptedPassword = await bcrypt.hash(password,10);
  

    const user =  await User.create({
      username: username,
      password: encryptedPassword,
      email: email,
    });

    const token = jwt.sign(
      {username:username,email},
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h"
      }
    )

    user.token = token;

    res.status(201).send(user);
 
  }catch(err){
    console.log(err);
  }
  
})

router.post('/login', async(req, res) => {
  try{

    const {username , password} = req.body;
    if(!(username && password)) {
      res.status(400).send("Please check username or password")
    }

    const user = await User.findOne({username});
  

    const uid = user._id

    if(user && (await bcrypt.compare(password,user.password))) {
      const token = jwt.sign(
        {username:username,uid},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h"
        }
      )
  
      user.token = token;
      res.status(200).send(user)
    }

    res.status(400).send("Invalid Credentials")
    
  }catch(err) {
    console.log(err);
  }
})

router.post('/welcome',auth,(req,res) => {
  res.status(200).send("Welcome Tester")
})

module.exports = router;
