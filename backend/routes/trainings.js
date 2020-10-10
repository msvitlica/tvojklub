const express = require("express");
const router = express.Router();
const uuid = require('uuid');
var url = require("url");

let trainings = [
  {
    id:uuid.v4(), term: "13-14", group: "Group1", coach: "Sinisa Kovacevic",
    membersInGroup: ["Sinisa Kovacevic", "Milan Svitlica", "Nada Jankovic", "Srecko Lazic"]
  },
  {
    id:uuid.v4(), term: "15-16", group: "Group3", coach: "Sinisa Kovacevic",
    membersInGroup: ['Rada Svitlica', 'Sofija Svitlica', 'Filip Svitlica']
  },
];

router.get("/list", async (req, res) => {
  try {
    res.status(200).json({
      trainings: trainings,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});
// get group by id
router.get('/:id', async (req, res) => {
  let pathName = url.parse(req.url, true).pathname;
  let pathId = pathName.replace('/', '');
  let filteredFile = trainings.filter(el => el.id.toString() === pathId)[0];
  console.log(filteredFile);
  try {
    res.status(200).json({
      trainingId:filteredFile
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
}

);

module.exports = router;