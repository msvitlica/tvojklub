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

    console.log(members[0].firstName);

    res.status(200).json({
      members: members.map(m => {
        return {...m,group: allGroups.find(g => g._id.toString() === m.groupId.toString()).name }})
    });
    console.log(members)
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});
router.post('/newMember', async (req, res) => {
  
  try {
    let newMember = await Member.create(req.body.member);
    console.log(newMember);
      res.status(200).json({
        msg: 'Member added'
      });        
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
    console.log(err);
  }
});

module.exports = router;
