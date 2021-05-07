const express = require("express");
const router = express.Router();

const Schedule = require('../models/scheduleModel');
const Group = require ('../models/groupModel');

router.get('/edit/:id', async (req, res) => {
    try {
        const scheduleId = req.params.id
        let schedule = await Schedule.findById(scheduleId);
        const groups = await Group.find({});
        schedule = { ...schedule.toObject(), attendedGroups:  groups.filter(group=> group._id.toString()== schedule.attendedGroups[0].groupId) }
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
    const allGroups= await Group.find();
    const settedTime = schedule.map(el => {
        return {
            _id: el._id,
            term: new Date(el.startTime).getHours() + ':' + (new Date(el.startTime).getMinutes()< 10 ? '0'+new Date(el.startTime).getMinutes():new Date(el.startTime).getMinutes() ) + '-' + new Date(el.endTime).getHours() + ':' +( new Date(el.endTime).getMinutes()< 10 ? '0'+ new Date(el.endTime).getMinutes() :new Date(el.endTime).getMinutes() ) ,
            duration: `${el.trainingDuration}`,
            description: `${el.aboutSchedule}`,
            groups: allGroups.filter(group=> group._id.toString()== el.attendedGroups[0].groupId ),
        }

    })
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
        let schedule = await Schedule.create(req.body.schedule);
        return res.status(200).send({
            error: false,
            msg: 'Raspored uspješno dodan!'
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
        const id = req.body.schedule._id;
        const schedule = req.body.schedule;
        await Schedule.findByIdAndUpdate(id, schedule); 
        res.status(200).send({
            msg: 'Raspored uspješno izmjenjen!'
        })
    } catch (err) {
        res.status(400).json({
            msg: 'Some error occured',
            err
        })
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Schedule.findByIdAndDelete(id);
        return res.status(200).send({
            msg: 'Raspored uspješno obrisan!'
        })
    } catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

module.exports = router;