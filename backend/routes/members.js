const express = require("express");
const router = express.Router();

let members = [
  { _id: 1, name:"Sinisa Kovacevic" },
  { _id: 2, name:"Milan Svitlica" },
  { _id: 3, name:"Nada Jankovic" },
  { _id: 4, name:"Srecko Lazic" },
];

router.get("/", async (req, res) => {
    try {
      res.status(200).json({
        members: members
      });
    } catch (err) {
      res.status(400).json({
        message: "Some error occured",
        err
      });
    }
  });
 
  module.exports = router;
