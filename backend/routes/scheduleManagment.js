const express = require("express");
const router = express.Router();

const Schedule = require('../models/scheduleModel');

router.get('/edit/:id', async (req, res) => {
    try {
        const scheduleId = req.params.id
        const schedule = await Schedule.findById(scheduleId);
        res.status(200).json(schedule);
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
})

router.get("/", async (req, res) => {
    const schedule = await Schedule.find();
    const settedTime = schedule.map(el => {
        return {
            _id: el._id,
            term: new Date(el.startTime).getHours() + ':' + (new Date(el.startTime).getMinutes()< 10 ? '0'+new Date(el.startTime).getMinutes():new Date(el.startTime).getMinutes() ) + '-' + new Date(el.endTime).getHours() + ':' +( new Date(el.endTime).getMinutes()< 10 ? '0'+ new Date(el.endTime).getMinutes() :new Date(el.endTime).getMinutes() ) ,
            duration: `${el.trainingDuration}`,
            description: `${el.aboutSchedule}`,
            groups: el.attendedGroups
        }

    })
    console.log(settedTime)
    try {
        res.status(200).json(settedTime);
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        let schedule = await Schedule.create(req.body.completeSchedule);
        return res.status(200).send({
            error: false,
            schedule
        })
    } catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const id = req.body.completeSchedule._id;
        const schedule = req.body.completeSchedule;
        await Schedule.findByIdAndUpdate(id, schedule);
    } catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Schedule.findByIdAndDelete(id);
        return res.status(200).send({
            error: false,
            msg: 'Schedule deleted!'
        })
    } catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

module.exports = router;