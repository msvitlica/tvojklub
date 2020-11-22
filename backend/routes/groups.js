const express = require("express");
const router = express.Router();
const uuid = require('uuid');


const Group = require('../models/groupModel')


router.get("/", async (req, res) => {
  try {
    let groups = await Group.find();
    return res.status(200).send(groups);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  try{
  let newGroup = await Group.create(req.body);
    return res.status(201).send({
      error: false,
      product: newGroup
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});

module.exports = router;
