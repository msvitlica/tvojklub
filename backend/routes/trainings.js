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
  const date = req.query.date;
  const dayName = helperMethods.convertDayNumberToString(new Date(date).getDay());
  const allMembers = await Members.find();
  const allSchedule = await Schedule.find();
  const allGroups = await Group.find();
  const todaySchedules = allSchedule.filter(schedule => schedule.recurrance.recurranceDays[dayName]);
  const todayTrainings = todaySchedules.map(training => {
    return {
      id: uuid.v1(),
      startTime: new Date(training.startTime).getHours() + ':' +( new Date(training.startTime).getMinutes()<10 ? '0'+ new Date(training.startTime).getMinutes() : new Date(training.startTime).getMinutes()),
      endTime: new Date(training.endTime).getHours() + ':' + (new Date(training.endTime).getMinutes()<10 ? '0' + new Date(training.endTime).getMinutes() : new Date(training.endTime).getMinutes()) ,
      group: allGroups.filter(group=> group._id.toString() === training.attendedGroups[0].groupId)[0],
      coach: 'Sinisa Kovacevic',
      membersInGroup: allMembers.filter(member => member.groupId.toString() === training.attendedGroups[0].groupId)
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
}

);

module.exports = router;