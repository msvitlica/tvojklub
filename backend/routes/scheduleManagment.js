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

// router.post('/', async (req, res) => {
//     const data = req.body;
//     const isValid = groups.filter(el => el.name === data.name.trim())[0] || data.name === '';
//     try {
//         if (!isValid) {
//             groups.push({
//                 id: uuid.v4(),
//                 name: data.name.trim()
//             });
//             res.status(200).json({
//                 msg: 'Item added'
//             });
//         } else {
//             throw console.log('Err');
//         }
//     } catch (err) {
//         res.status(400).json({
//             msg: 'Bad Request'
//         })
//     }
// });

module.exports = router;