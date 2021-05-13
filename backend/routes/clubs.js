const express = require("express");
const router = express.Router();
const uuid = require('uuid');

const Club = require('../models/clubModel');

// GET CLUB BY OWNER_ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const targetClub = await Club.findOne({ owner: id });
  console.log(targetClub);
  res.status(200).send(targetClub);
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    await Club.findOne({ name: body.name }, (err, club) => {
      if (err) return console.log(err);
      if (club) {
        console.log('Club already exists');
        res.status(400).send({ msg: 'Klub sa istim imenom već postoji.' });
      } else {
        new Club(req.body).save((err, club) => {
          if (err) return console.log(err)
          console.log('New club created');
          res.status(200).send({ msg: 'Klub je uspješno kreiran.' });
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});

// PUT REQUEST
// router.put('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;
//     await Group.findOne({ name: body.name }, function (err, group) {
//       if (err) console.log(err);
//       if (group && group.id !== id) {
//         console.log('Group already exists');
//         res.status(400).send({ msg: 'Grupa sa istim imenom već postoji.' });
//       } else {
//         Group.findByIdAndUpdate(id, { name: body.name },
//           function (err, group) {
//             if (err) {
//               console.log(err)
//             }
//             else {
//               console.log("Updated Group");
//               res.status(200).send({ msg: 'Izmijenjen naziv grupe.' });

//             }
//           });
//       }
//     });
//   } catch (err) {
//     res.status(400).json({
//       msg: 'Bad Request'
//     })
//   }
// });

// DELETE REQUEST
// router.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Group.findByIdAndRemove(id);
//     res.status(200).send({
//       msg: `Grupa je obrisana.`
//     })
//   } catch (err) {
//     res.status(400).json({
//       msg: 'Bad request',
//       err
//     })
//   }
// });

module.exports = router;
