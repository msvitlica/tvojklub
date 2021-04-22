const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const groupModel = require("../models/groupModel");

const Member = require('../models/memberModel');

const Group = require('../models/groupModel')

router.get("/", async (req, res) => {
  try {
    const allGroups = await Group.find()
    const members = await Member.find();    
 
    res.status(200).json({
      members: members.map(m => {
        return {...m.toObject(),group: allGroups.find(g => g._id.toString() === m.groupId.toString()).name }})
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const targetMember = await Member.findById(id);
  console.log(targetMember);
  res.status(200).send(targetMember);
});

router.post('/newMember', async (req, res) => {  
  try {
    let newMember = await Member.create(req.body.member);
    console.log(newMember);
      res.status(200).json({
        msg: 'Novi član uspješno dodan!'
      });        
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
    console.log(err);
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Member.findByIdAndUpdate(id, req.body, (err, member) => {
      if(err) {
        console.log(err);
      } else {
        res.status(200).json({
          msg: 'Uspješno ste izmijenili člana!'
        });
      }
    })      
  } catch(err) {
    res.status(400).json({
      msg: 'Neuspješna izmjena člana!'
    })
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndRemove(req.params.id);
    res.status(200).send({
      msg: `Grupa je obrisana.`
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Bad request',
      err
    });
  }
});

module.exports = router;
