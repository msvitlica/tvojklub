const express = require("express");
const router = express.Router();
const uuid = require('uuid');

let groups = [
  { id: uuid.v4(), name: "Početna" },
  { id: uuid.v4(), name: "Napredna" }
];

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      groups: groups
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body;
  const isValid = groups.filter(el => el.name === data.name)[0];
  console.log(isValid)
  try {
    if (!isValid) {
      groups.push({
        id: uuid.v4(),
        name: data.name
      });
      res.status(200).json({
        msg: 'Item added'
      });
    } else {
      throw console.log('Err');
    }
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
    console.log(err);
  }
});

module.exports = router;