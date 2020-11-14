const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const url = require("url");

let processedGroups = [{one:'one'},{two:'two'}];
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      processedGroups: processedGroups
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
  console.log(data);
  try {
    if (data) {
      processedGroups.push(data)
      res.status(200).json({
        message: 'data aded'
      })
      console.log(processedGroups)
    }
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    })
  }
})

module.exports = router;