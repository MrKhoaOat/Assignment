const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
const fs = require('fs')

const Products =  require('../models/product');
const auth = require('../middleware/auth')


router.get('/',async(req, res) => {
   const prod =  await Products.find({});
    res.status(200).send(prod);
  })



router.post('/insertOne',auth, async(req, res) => {
  var {img,name,desc,price,brand,type,pack} = req.body;
    await Products.create({
      prod_img: img,
      prod_name: name,
      prod_desc: desc,
      prod_price: parseInt(price),
      prod_brand: brand,
      prod_type: type,
      prod_pack:  parseInt(pack),
    });
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = "+1+" is created",
      "user": "MrCrowXYZ"
    });
  })

  router.post('/insertMany',auth, async(req, res) => {
    const file = req.body;
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'))
    
    await Products.insertMany(data);
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = "+1+" is created",
      "user": "MrCrowXYZ"
    });
  })



  router.put('/update/:id',auth, async(req, res) => {
    var {name,desc,price,brand,type,pack} = req.body;
    await Products.updateMany({'_id': req.params.id}, {"$set": {
      "prod_name": name,
      "prod_desc": desc,
      "prod_price": parseInt(price),
      "prod_brand": brand,
      "prod_type": type,
      "prod_pack": parseInt(pack)
    }});
    res.status(200).send({
      "data":[name,desc,price,brand,type,pack],
      "status": "ok",
      "message": "User with ID = "+1+" is updated",
      "user": "MrCrowXYZ"
    });
  })



  router.delete('/delete/:id',auth, async(req, res) => {
    await Products.deleteOne({"_id": req.params.id});
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = "+1+" is deleted"
    });
  })



module.exports =  router;