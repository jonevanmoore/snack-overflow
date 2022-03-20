const express = require('express');
const { Question, User, Answer } = require('../db/models');
const router = express.Router();
const { Op } = require('sequelize');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler( async(req, res, next) => {
    const q = req.query.q;
    let questions = await Question.findAll({
        include: [User, Answer],
        where: {
            [Op.or]: [
                { title: {
                    [Op.iLike]: `%${q}%`
                }},
                { body: {
                    [Op.iLike]: `%${q}%`
                }},
            ]
        },
        order: [ ['updatedAt', 'DESC'] ],
    });
    questions = questions.map(el => {
        let preview = el.body.slice(0,141);
        console.log(preview)
        if (preview.length > 140) preview = preview.replace(/\s\S*$/, "") + "...";
        el.preview = preview;
        return el;
    });
    res.render('questions-list', {questions, noun: "Result"});
}));


module.exports = router;
