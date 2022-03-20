const express = require('express');
const { Question, User, Answer, Vote } = require('../db/models');
const router = express.Router();

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.post('/', asyncHandler( async(req, res) => {
  console.log('here');
  if( req.session.auth ){
    const user_id = req.session.auth.userId;
    const { question_id, answer_id, value } = req.body;

    const vote = await Vote.findOne({
      where: {
        user_id,
        answer_id
      }
    });

    if( vote ){
      if( vote.value !== value ){
        const oldValue = vote.value;
        vote.value = value;
        try{
          await vote.save();
          res.status(200).json( {delta: (value - oldValue)} );
        }catch(e){
          res.status(500).json(e);
        }
      } else {
        res.status(405).json();
      }
    } else {
      try {
        await Vote.create({
          user_id,
          answer_id,
          value
        }); 
        res.status(201).json();
      } catch(e) {
        res.status(500).json();
      }
    }
  } else { // inauth
    res.status(401)
    res.json();
  }
}));

module.exports = router;
