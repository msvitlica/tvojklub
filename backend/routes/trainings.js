const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const { format } = require('date-fns');

let attendanceStatus = {
  attended: 'attended',
  noAttended: 'noAttended',
  unknown: 'unknown',
}
const getCurrentDate = () => {
  let date = new Date();
  const formattedDate = format(date, "yyy-MM-dd");
  return formattedDate;
}
const getYesterdaysDate = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;

}
const getTomorrowsDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
}
let trainings = [
  {
    id: uuid.v4(), term: "13-14", group: "Group1", coach: "Sinisa Kovacevic", date: getCurrentDate(),
    membersInGroup: [{ name: "Sinisa Kovacevic", id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: "Milan Svitlica", id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: "Nada Jankovic", id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: "Srecko Lazic", id: uuid.v4(), attendance: attendanceStatus.unknown }]
  },
  {
    id: uuid.v4(), term: "15-16", group: "Group3", coach: "Sinisa Kovacevic", date: getYesterdaysDate(),
    membersInGroup: [{ name: 'Rada Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Sofija Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Filip Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }]
  },
  {
    id: uuid.v4(), term: "12-13", group: "Group2", coach: "Sinisa Kovacevic", date: getTomorrowsDate(),
    membersInGroup: [{ name: 'Rada Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Sofija Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Filip Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }]
  },
  {
    id: uuid.v4(), term: "16-17", group: "Group4", coach: "Sinisa Kovacevic", date: getCurrentDate(),
    membersInGroup: [{ name: 'Rada Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Sofija Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Filip Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }]
  },
  {
    id: uuid.v4(), term: "15-16", group: "Group3", coach: "Sinisa Kovacevic", date: getTomorrowsDate(),
    membersInGroup: [{ name: 'Rada Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Sofija Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }, { name: 'Filip Svitlica', id: uuid.v4(), attendance: attendanceStatus.unknown }]
  },
];

//get training by date
router.get('/', async (req, res) => {
  console.log(req.query.date);
  let filteredByDate = trainings.filter(el => el.date === req.query.date);
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
  const id = req.params.id;
  let training = trainings.filter(el => el.id === id)[0];
  console.log(training);
  try {
    res.status(200).json({
      trainingId: training,
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

module.exports = router;