const express = require("express");
const router = express.Router();
const uuid = require('uuid');


const Group = require('../models/groupModel')


router.get("/", async (req, res) => {
  try {
    let groups = await Group.find();
    console.log(groups);
    return res.status(200).send(groups);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post('/', async (req, res) => {
  try {
    let newGroup = await Group.create(req.body);
    console.log(newGroup);
    return res.status(200).send({
      newGroup: newGroup
      /* error: false,
      product: newGroup */
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});

module.exports = router;
