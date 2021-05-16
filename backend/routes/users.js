const express = require("express");
const router = express.Router();
const uuid = require('uuid');

const User = require('../models/userModel');

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const targetUser = await User.findById(id);
    res.status(200).send(targetUser)
  } catch(err) {
    console.log(err);
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    await User.findOne({ _id: id }, function (err, user) {
      if (err) console.log(err);
      if (user && user.club && user.club.clubId) {
        res.status(400).send({ msg: 'Taj korisnik već ima klub.' });
      } else {
        User.findByIdAndUpdate(id, { ...body },
          function (err, user) {
            if (err) {
              console.log(err)
            }
            else {
              console.log("Updated user");
              res.status(200).send({ msg: 'Korisniku uspješno pridodan klub.' });
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


module.exports = router;