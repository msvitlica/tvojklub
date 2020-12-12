const express = require("express");
const router = express.Router();
const uuid = require('uuid');


const Group = require('../models/groupModel')


router.get("/", async (req, res) => {
  try {
    let groups = await Group.find();
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
  return res.status(200).send(targetGroup);
});
router.post('/', async (req, res) => {
  try {
    let newGroup = await Group.create(req.body);
    return res.status(200).send({
      newGroup: newGroup
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Bad Request'
    })
  }
});
router.put ('/edit/:id', async(req,res)=>{
  try{
    const id = req.params.id;
    const body= req.body;
    console.log(body);
    const updatedGroup= await Group.findByIdAndUpdate(id,body);
    return res.status(200).send({
      updatedGroup: updatedGroup
    });
  } catch (err){
    res.status(400).json({
      msg:'Bad Request'
    })
  }
  
});
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const groupById = await Group.findByIdAndRemove(id);
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
