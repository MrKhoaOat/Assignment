var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const decompress = require('decompress')
require('dotenv').config();
const User =  require('../models/user')
const auth = require('../middleware/auth')

router.use(fileUpload());

router.post('/upload', function(req, res) {
    let sampleFile;
 

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
  
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`./data/${sampleFile.name}`, function(err) {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
  });

  module.exports = router;
