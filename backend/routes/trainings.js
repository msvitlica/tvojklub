const express = require("express");
const router = express.Router();

let tranings = [
  { _id: 1, term: "13-14", groups: "Group1, Group2", coach:"Sinisa Kovacevic" },
  { _id: 2, term: "15-16", groups: "Group3", coach:"Sinisa Kovacevic" },
  { _id: 3, term: "17-20", groups: "Group5", coach:"Sinisa Kovacevic" },
  { _id: 4, term: "18-20", groups: "Group5", coach:"Sinisa Kovacevic" },
];

router.get("/trainings", async (req, res) => {
    try {
      res.status(200).json({
        trainings: tranings
      });
    } catch (err) {
      res.status(400).json({
        message: "Some error occured",
        err
      });
    }
  });
 
  module.exports = router;