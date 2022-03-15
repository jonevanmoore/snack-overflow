const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question, User } = require('../db/models');
const router = express.Router();

const csrfProtection = csrf({cookie: true});
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/new', csrfProtection, asyncHandler( async(req, res) => {
    if (req.session.auth) {
        res.render('question-create', {token: req.csrfToken()});
    } else {
        res.render('user-login', {title: 'Login to ask a question', token: req.csrfToken()})
    }
}));

const questionValidator = [
    check("title")
        .exists({checkFalsy: true})
        .withMessage("Please input a title.")
        .isLength({max: 255})
        .withMessage("Title must be 255 characters or fewer."),
    check("body")
        .exists({checkFalsy: true})
        .withMessage("Please input a body.")
];

router.post('/new', questionValidator, csrfProtection, asyncHandler( async(req, res, next) => {
    const {title, body, image_link1, image_link2, image_link3} = req.body;
    const question = Question.build({
        user_id: res.locals.user.id,
        title,
        body,
        image_link1,
        image_link2,
        image_link3
    });

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
        const newQ = await question.save();
        res.redirect(`/questions/${newQ.id}`)
    } else {
        const errors = validateErrors.array().map(error => error.msg);
        res.render('question-create', {
            question,
            errors,
            token: req.csrfToken()
        });
    }
}));

module.exports = router;