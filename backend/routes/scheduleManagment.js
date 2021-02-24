const express = require("express");
const router = express.Router();

const Schedule = require('../models/scheduleModel');

router.get('/edit/:id', async (req, res) => {
    try {
        const scheduleId = req.params.id
        const schedule = await Schedule.findById(scheduleId);
        return res.status(200).json(schedule);
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
})

router.get("/", async (req, res) => {
    try {
        const schedule = await Schedule.find();
        return res.status(200).send(schedule);
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
            msg: 'Trening je uspjesno dodat!'
        })
    }
    catch (err) {
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
        let editedSchedule = await Schedule.findByIdAndUpdate(id, schedule);
        res.status(200).send({
            msg: 'Trening je uspjesno izmijenjen!'
        })
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
            msg: 'Trening je obrisan!'
        })
    } catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

module.exports = router;