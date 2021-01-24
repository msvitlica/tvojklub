const express = require("express");
const router = express.Router();
const uuid = require('uuid');
const url = require("url");
const helperMethods = require('../../frontend/src/helpers/helpersMethods');


// Includes all required models
const Training = require('../models/trainingModel');
const Members = require('../models/memberModel');
const Schedule = require('../models/scheduleModel');
const Group = require('../models/groupModel');

let attendanceStatus = {
  attended: 'attended',
  noAttended: 'noAttended',
  unknown: 'unknown',
}

router.get("/", async (req, res) => {
  const date = Number(req.query.date);
  console.log(date);
  const today = helperMethods.convertDayNumberToString(new Date(date).getDay());
  const todaysDate = new Date(date);
  console.log(todaysDate)
  const allMembers = await Members.find();
  const allSchedule = await Schedule.find();
  const allGroups = await Group.find();
  const todaySchedules = allSchedule.filter(schedule => schedule.recurrance.recurranceDays[today]);
  const todayTrainings = todaySchedules.map(training => {
    return {
      scheduleId: training._id,
      term: `${training.startTime} - ${training.endTime}`,
      group: allGroups.filter(group => group._id.toString() === training.attendedGroups[0].groupId)[0],
      coach: 'Sinisa Kovacevic',
      membersInGroup: allMembers.filter(member => member.groupId.toString() === training.attendedGroups[0].groupId),
      trainingDate: todaysDate
    }
  });
  try {
    res.status(200).json({
      trainings: todayTrainings,
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
  const trainingId = req.params.id;
  let filteredTraining = await Training.findById(trainingId);
  try {
    res.status(200).json({
      filteredTraining
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

//Saves training in database
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const savedTraining = await new Training(req.body).save();
    res.status(200).json(savedTraining._id);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    })
  }
})

module.exports = router;