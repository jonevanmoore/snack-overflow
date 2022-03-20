const express = require('express');
const { Question, User, Answer, Vote } = require('../db/models');
const { sequelize } = require('../db/models/index');
const router = express.Router();

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next);

router.post('/', asyncHandler( async(req, res) => {
  if( req.session.auth ){
    const user_id = req.session.auth.userId;
    const { question_id, answer_id, value } = req.body;
 
    const vote = await Vote.findOne({
      where: {
        user_id,
        answer_id
      }
    });
    const scoreQuery = await sequelize.query( `SELECT SUM("value") FROM "Votes" WHERE answer_id = ${answer_id}` );
    let score = Number(scoreQuery[0][0].sum);
    const oldValue = vote ? vote.value : 0 
    const change = value - oldValue;
    score+= change;


    if( vote ){
      if( vote.value !== value ){
        try{
          vote.value = value;
          await vote.save();
          res.status(200).json( { score } );
        }catch(e){
          console.log(e);
          res.status(501).json();
        }
      } else {
        console.log(vote.value, value)
        res.status(405).json();
      }
    } else {
      try {
        await Vote.create({
          user_id,
          answer_id,
          value
        }); 
        res.status(201).json( { score } );
      } catch(e) {
        console.log(e);
        res.status(502).json();
      }
    }
  } else { // inauth
    res.status(401)
    res.json();
  }
}));

module.exports = router;
