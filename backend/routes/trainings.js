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
  const today = helperMethods.convertDayNumberToString(new Date(date).getDay());
  const todayDate = new Date(date);
  const allMembers = await Members.find();
  const allSchedule = await Schedule.find();
  const allGroups = await Group.find();
  const trainingsFromDatabase = await Training.find({ trainingDate: { $lte: new Date((date + (1000 * 60 * 60 * 24))), $gte: new Date((date + 1)) } });
  const todaySchedules = allSchedule.filter(schedule => schedule.recurrance.recurranceDays[today])
    .map(schedule => {
      return {
        scheduleId: schedule._id,
        term: `${schedule.startTime} - ${schedule.endTime}`,
        group: allGroups.filter(group => group._id.toString() === schedule.attendedGroups[0].groupId)[0],
        coach: 'Sinisa Kovacevic',
        membersInGroup: allMembers.filter(member => member.groupId.toString() === schedule.attendedGroups[0].groupId),
        trainingDate: todayDate
      }
    });
  const allTrainings = todaySchedules.concat(trainingsFromDatabase);
  try {
    res.status(200).json({
      trainings: allTrainings,
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