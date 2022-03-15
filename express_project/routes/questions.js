const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question } = require('../db/models');
const router = express.Router();

const csrfProtection = csrf({cookie: true});
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', csrfProtection, asyncHandler( async(req, res) => {
    res.render('question-create', {token: req.csrfToken()});
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

router.post('/', questionValidator, csrfProtection, asyncHandler( async(req, res, next) => {
    const {title, body, image_link1} = req.body;
    const question = Question.build({
        title,
        body,
        image_link1
    });

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
        const newQ = await question.save();
        res.redirect(`/questions/${newQ.id}`)
    } else {
        const errors = validateErrors.array()
    }
}));

module.exports = router;