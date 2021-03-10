const express = require("express");
const router = express.Router();
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
  const todayDate = new Date(date + (1000 * 60 * 60));
  const allMembers = await Members.find();
  const allSchedule = await Schedule.find();
  const allGroups = await Group.find();
  const trainingsFromDatabase = await Training.find({ trainingDate: { $lte: new Date((date + (1000 * 60 * 60 * 24))), $gte: new Date((date)) } });
  let todaySchedules = allSchedule.filter(schedule => schedule.recurrance.recurranceDays[today])
    .map(schedule => {
      return {
        scheduleId: schedule._id,
        startTime: new Date(schedule.startTime).getHours() + ':' + (new Date(schedule.startTime).getMinutes() < 10 ? '0' + new Date(schedule.startTime).getMinutes() : new Date(schedule.startTime).getMinutes()),
        endTime: new Date(schedule.endTime).getHours() + ':' + (new Date(schedule.endTime).getMinutes() < 10 ? '0' + new Date(schedule.endTime).getMinutes() : new Date(schedule.endTime).getMinutes()),
        group: allGroups.filter(group => group._id.toString() === schedule.attendedGroups[0].groupId)[0],
        coach: 'Sinisa Kovacevic',
        membersInGroup: allMembers.filter(member => member.groupId.toString() === schedule.attendedGroups[0].groupId),
        trainingDate: todayDate
      }
    });
  trainingsFromDatabase.forEach(training => {
    todaySchedules = todaySchedules.filter(scheduleTraining => scheduleTraining.scheduleId.toString() !== training.scheduleId.toString());
  });

  const allTrainings = todaySchedules.concat(trainingsFromDatabase).sort((trainingA, trainingB) => {
    const timeA = helperMethods.amPmTimeFormat(trainingA);
    const timeB = helperMethods.amPmTimeFormat(trainingB);
    return Date.parse(`1970/01/01 ${timeA}`) - Date.parse(`1970/01/01 ${timeB}`);
  });

  try {
    res.status(200).json({
      allTrainings,
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
    const savedTraining = await new Training(req.body).save();
    res.status(200).json(savedTraining._id);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    })
  }
})

//Edit training in database
router.put('/', async (req, res) => {
  try {
    const training = req.body;
    const trainingFromDatabase = await Training.updateOne({ _id: training._id }, { [training.editedProp]: training.editedPropValue });
    res.status(200).json(trainingFromDatabase);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    })
  }
});

module.exports = router;