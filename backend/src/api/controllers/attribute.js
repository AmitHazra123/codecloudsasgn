const mongoose = require('mongoose');
const aws = require('aws-sdk');
const Q = require('q');
const utf8 = require('utf8');

// models
const Attribute = require('../models/Attribute');

const {ObjectId} = mongoose.Types;

module.exports.getAllAttributes = (req, res) => {
  Attribute.find({isValid: true}).sort({_id: -1}).then(aAttributes => {
    res.status(200).send({attributes: aAttributes, count: aAttributes.length});
  }).catch(oError => {
    res.status(400).send({error: oError});
  });
}

module.exports.getAttributeById = (req, res) => {
  Attribute.findOne({_id: ObjectId(req.params.id), isValid: true}).then(oAttribute => {
    res.status(200).send(oAttribute);
  }).catch(oError => {
    res.status(400).send({error: oError});
  });
}

module.exports.createAttribute = (req, res) => {
  const oAttributeInfo = req.body;
  if(!oAttributeInfo.name) {
    return res.status(400).send({
      msg: "name is required!",
    });
  }
  oAttributeInfo.isValid = true;
  oAttributeInfo.createdOn = new Date();
  oAttributeInfo.updatedOn = new Date();
  const newAttribute = new Attribute(oAttributeInfo);
  newAttribute.save().then(oAttribute => {
    res.status(200).send(oAttribute);
  }).catch(oError => {
    res.status(400).send({error: oError});
  });
}

module.exports.updateAttributeById = (req, res) => {
  const oAttributeInfo = req.body;
  delete oAttributeInfo._id;
  oAttributeInfo.updatedOn = new Date();
  Attribute.findOneAndUpdate(
    { _id: ObjectId(req.params.id), isValid: true },
    { $set: oAttributeInfo },
    { new: true }
  ).then(oAttribute => {
    res.status(200).send(oAttribute);
  }).catch(oError => {
    res.status(400).send({error: oError});
  });
}

module.exports.deleteAttributeById = (req, res) => {
  Attribute.findOneAndUpdate({_id: ObjectId(req.params.id), isValid: true}, {$set: {isValid: false}}, {new: true}).then(oAttribute => {
    if(oAttribute) {
      res.status(200).send(oAttribute);
    } else {
      res.status(400).send({msg: "Your attribute is already deleted!"});
    }
  }).catch(oError => {
    res.status(400).send({error: oError});
  });
}