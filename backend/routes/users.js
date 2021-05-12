const express = require("express");
const router = express.Router();
const uuid = require('uuid');

const User = require('../models/userModel');

router.put('/edit/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    await User.findOne({ _id: id }, function (err, user) {
      if (err) console.log(err);
      if (user && user.club) {
        console.log('User already has a club');
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