const express = require("express");
const router = express.Router();
let members = [
  { id: 1, firstName: "Sinisa", lastName: 'Kovacevic', dateOfBirth: '12.04.1988.', group: 'Napredna' },
  { id: 2, firstName: "Milan", lastName: 'Svitlica', dateOfBirth: '20.06.1987.', group: 'Napredna' },
  { id: 3, firstName: "Nada", lastName: 'Jankovic', dateOfBirth: '22.10.1986.', group: 'Napredna' },
  { id: 4, firstName: "Srecko", lastName: 'Lazic', dateOfBirth: '10.11.1990.', group: 'Napredna' },
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

module.exports = router;
