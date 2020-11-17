const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const url = require("url");
 
let attendanceStatus= {
  attended: 'attended',
  noAttended: 'noAttended',
  unknown: 'unknown',
}
let trainings = [
  {
    id: uuid.v4(), term: "13-14", group: "Group1", coach: "Sinisa Kovacevic",date:'2020-11-18',
    membersInGroup: [{name:"Sinisa Kovacevic",id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:"Milan Svitlica",id: uuid.v4(),attendance:attendanceStatus.unknown},{name:"Nada Jankovic",id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:"Srecko Lazic",id: uuid.v4(),attendance:attendanceStatus.unknown}]
  },
  {
    id: uuid.v4(), term: "15-16", group: "Group3", coach: "Sinisa Kovacevic",date:'2020-11-16',
    membersInGroup: [{name:'Rada Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Sofija Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Filip Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}]
  },
  {
    id: uuid.v4(), term: "12-13", group: "Group2", coach: "Sinisa Kovacevic",date:'2020-11-16',
    membersInGroup: [{name:'Rada Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Sofija Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Filip Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}]
  },
  {
    id: uuid.v4(), term: "16-17", group: "Group4", coach: "Sinisa Kovacevic",date:'2020-11-17',
    membersInGroup: [{name:'Rada Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Sofija Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Filip Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}]
  },
  {
    id: uuid.v4(), term: "15-16", group: "Group3", coach: "Sinisa Kovacevic",date:'2020-11-17',
    membersInGroup: [{name:'Rada Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Sofija Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}, {name:'Filip Svitlica',id: uuid.v4(),attendance:attendanceStatus.unknown}]
  },
];

/* router.get("/", async (req, res) => {
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
}); */

//get training by date
router.get('/:date', async (req,res)=>{
  let pathName= url.parse(req.url, true).pathname;
  let pathDate=pathName.replace('/','');
  let filteredByDate= trainings.filter(el=>el.date === pathDate);
  console.log(filteredByDate);
  try {
    res.status(200).json({
      training: filteredByDate,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
})
// get group by id
router.get('/:id', async (req, res) => {
  let pathName = url.parse(req.url, true).pathname;
  let pathId = pathName.replace('/', '');
  let filteredFile = trainings.filter(el => el.id=== pathId);
  console.log(filteredFile);
  try {
    res.status(200).json({
      trainingId: filteredFile,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;