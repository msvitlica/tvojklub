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
  console.log(date)
  const dayName = helperMethods.convertDayNumberToString(new Date(date).getDay());
  console.log(dayName)
  const allMembers = await Members.find();
  const allSchedule = await Schedule.find();
  const allGroups = await Group.find();
  const todaySchedules = allSchedule.filter(schedule => schedule.recurrance.recurranceDays[dayName]);
  const todayTrainings = todaySchedules.map(training => {
    return {
      id: uuid.v1(),
      term: `${training.startTime} - ${training.endTime}`,
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
  let pathName = url.parse(req.url, true).pathname;
  let pathId = pathName.replace('/', '');
  let filteredFile = trainings.filter(el => el.id.toString() === pathId)[0];
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
}

);

module.exports = router;