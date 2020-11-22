const express = require("express");
const router = express.Router();
const uuid = require('uuid');

let schedule = [
    { _id: 1, startTime: 8, endTime: 10, duration: `${02} sat/a ${00} min`, groups: "Group1, Group2" }
]


router.get("/", async (req, res) => {
    try {
        res.status(200).json({
            schedule
        });
    } catch (err) {
        res.status(400).json({
            message: "Some error occured",
            err
        });
    }
});

module.exports = router;