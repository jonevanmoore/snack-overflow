const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, Vote } = require('../db/models');
const router = express.Router();

const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', csrfProtection, async(req, res) => {
    let questions = await Question.findAll({include: User});
    console.log(typeof(questions), Array.isArray(questions))
    questions = questions.map(el => {
        let preview = el.body.slice(0,141);
        console.log(preview)
        if (preview.length > 140) preview = preview.replace(/\s\S*$/, "") + "...";
        el.preview = preview;
        return el;
    });
    res.render('question-read', {questions});
});

router.get('/new', csrfProtection, asyncHandler( async(req, res) => {
    if (req.session.auth) {
        const question = {};
        res.render('question-create', { question, token: req.csrfToken() });
    } else {
        res.render('user-login', { title: 'Login to ask a question', token: req.csrfToken() })
    }
}));

const questionValidator = [
    check("title")
        .exists({ checkFalsy: true })
        .withMessage("Please input a title.")
        .isLength({ max: 255 })
        .withMessage("Title must be 255 characters or fewer."),
    check("body")
        .exists({ checkFalsy: true })
        .withMessage("Please input a body."),
    check("image_link1")
        .optional({ checkFalsy: true })
        .isURL({ checkFalsy: true })
        .withMessage("Please use an image URL (1)."),
    check("image_link2")
        .optional({ checkFalsy: true })
        .isURL({ checkFalsy: true })
        .withMessage("Please use an image URL (2)."),
    check("image_link3")
        .optional({ checkFalsy: true })
        .isURL({ checkFalsy: true })
        .withMessage("Please use an image URL (3).")

];

router.post('/new', csrfProtection, questionValidator, asyncHandler(async (req, res, next) => {
    const { title, body, image_link1, image_link2, image_link3 } = req.body;
    const question = {
        user_id: res.locals.user.id,
        title,
        body,
        image_link1,
        image_link2,
        image_link3
    };

    const validateErrors = validationResult(req);

    if (validateErrors.isEmpty()) {
        const newQ = await Question.create(question);
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

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const questionId = req.params.id;

    const question = await Question.findOne({
        where: { id: Number(questionId) },
        include: [{
            model: User,
            attributes: ['username', 'image_link', 'id']
        }, {
            model: Answer,
            include: [ Vote,{
              model: User,
              attributes: ['username', 'image_link', 'id']
            }]
        }]
    });

    if (question) {
        //console.log( JSON.stringify(question) );
        res.render('question', { token: req.csrfToken(), question });
    } else {
        const error = new Error('Question not found');
        error.status = 404;
        next(error);
    }
}));

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler( async(req, res, next) => {
    if (req.session.auth && question.user_id === res.locals.user.id) {
        res.render('question-edit', { token: req.csrfToken() })
    } else {
        const error = new Error('Not authorized');
        error.status = 401;
        next(error);
    }
}));

router.post('/:id(\\d+)', csrfProtection, questionValidator, asyncHandler( async(req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    if (question) {
        if (req.session.auth && question.user_id === res.locals.user.id) {
            const { title, body, image_link1, image_link2, image_link3 } = req.body;
            const updatedQ = Question.build({
                title,
                body,
                image_link1,
                image_link2,
                image_link3,
            })
            res.render('question-edit', { updatedQ, token: req.csrfToken() })
        } else {
            const error = new Error('Not authorized');
            error.status = 401;
            next(error);
        }
    } else {
        const error = new Error('Question not found');
        error.status = 404;
        next(error);
    }
}));

module.exports = router;
