const express = require("express");
const router = express.Router();
const uuid = require('uuid');


const Group = require('../models/groupModel')


router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).send(groups);
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});
router.get('/edit/:id', async (req, res) => {
  const id = req.params.id;
  const targetGroup = await Group.findById(id);
  console.log(targetGroup);
   res.status(200).send(targetGroup);
});
router.post('/', async(req, res) => {
  try {
    const body = req.body;
   await Group.findOne({ name: body.name }, function (err, group) {
      if (err) console.log(err);
      if (group ) {
        console.log('Group already exists');
        res.status(400).send({ msg: 'Grupa sa istim imenom već postoji.' });
      } else {
       new Group(req.body).save(function (err, group) {
          if (err) { console.log(err) } else {
            console.log('New group created');
            res.status(200).send({ msg: 'Grupa je kreirana.' });
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});
router.put('/:id', async(req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
   await Group.findOne({ name: body.name }, function (err, group) {
      if (err) console.log(err);
      if (group && group.id !== id) {
        console.log('Group already exists');
        res.status(200).send({ msg: 'Grupa sa istim imenom već postoji.' });
      } else {
       Group.findByIdAndUpdate(id, { name: body.name },
          function (err, group) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Updated Group");
              res.status(200).send({ msg: 'Izmijenjen naziv grupe.' });

            }
          });
      }
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Group.findByIdAndRemove(id);
    res.status(200).send({
      msg: `Grupa je obrisana.`
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Bad request',
      err
    })
  }

});

module.exports = router;
