const express = require("express");
const router = express.Router();
const uuid = require('uuid');
let members = [
  { id: uuid.v4(), firstName: "Sinisa", lastName: 'Kovacevic', dateOfBirth: '12.04.1988.', group: 'Napredna' },
  { id: uuid.v4(), firstName: "Milan", lastName: 'Svitlica', dateOfBirth: '20.06.1987.', group: 'Napredna' },
];
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      members: members
    });
    console.log(members)
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});
router.post('/newMember', async (req, res) => {
  const data = req.body;
  console.log(data.member);
  const filteredMembers = members.find((el) => el.id=== data.id);
  try {
    if (!filteredMembers) {
      members.push({
        id: uuid.v4(),
        firstName: data.member.firstName,
        lastName: data.member.lastName,
        dateOfBirth: data.member.dateOfBirth,
        group: data.member.group,
      });
      res.status(200).json({
        msg: 'Member added'
      });
      console.log(members)
    } else {
      throw console.log('Err');
    }
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
    console.log(err);
  }
});

module.exports = router;
