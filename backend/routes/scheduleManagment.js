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
    try {
        const schedule = await Schedule.find();
        res.status(200).json(schedule);
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

router.post('/add', async (req, res) => {
    try{
        console.log(req.body);
        let schedule = await Schedule.create(req.body.schedule);
        return res.status(200).send({
            error: false,
            schedule
        })
    }catch (err) {
        res.status(400).json({
            message: 'Some error occured',
            err
        })
    }
});

// router.put('/edit/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         await Schedule.findById(id);
//     } catch (err) {
//         res.status(400).json({
//             message: 'Some error occured',
//             err
//         })
//     }
// });

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Schedule.findByIdAndDelete(id);
        return res.status(200).send({
            error:false,
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