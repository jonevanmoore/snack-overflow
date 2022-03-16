const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, Vote } = require('../db/models');

const router = express.Router();

const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.post('/', csrfProtection, asyncHandler(async (req, res, next) => {
    const { question_id, body, image_link1, image_link2, image_link3 } = req.body
    if (req.session) {
        const user_id = req.session.auth.userId
        const newAnswer = Answer.build({
            user_id,
            question_id,
            body,
            image_link1,
            image_link2,
            image_link3
        })
        await newAnswer.save()
        res.redirect(`/questions/${question_id}`)
    } else {
        const error = new Error('Unauthenticated')
        error.status = 401
        next(error)
    }

}))




module.exports = router
