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
  return res.status(200).send(targetGroup);
});
router.post('/', (req, res, next) => {
  try {
    const body = req.body;
    Group.findOne({ name: body.name }, function (err, group) {
      if (err) console.log(err);
      if (group) {
        console.log('Group already exists');
        res.status(200).send({msg:'Group already exists'});
      } else {
        let group = new Group(req.body);
        group.save(function (err, group) {
          if (err) console.log(err);
          console.log('New group created');
          res.status(200).send({msg:'New group created'});
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});
router.put('/edit/:id', (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    Group.findOne({ name: body.name }, function (err, group) {
      if (err) console.log(err);
      if (group) {
        console.log('Group already exists');
        res.status(200).send({msg:'Group already exists'});
      } else {
        Group.findByIdAndUpdate(id, { name: body.name },
          function (err, group) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Updated Group");
              res.status(200).send({msg:'Group already exists'});
              
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
      msg: `Group with id ${id} has been deleted`
    })
  } catch (err) {
    res.status(400).json({
      msg: 'Bad request',
      err
    })
  }

});

module.exports = router;
