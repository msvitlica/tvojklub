const express = require("express");
const router = express.Router();
const uuid = require('uuid');

const Member = require('../models/memberModel');

router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json({
      members: members
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
