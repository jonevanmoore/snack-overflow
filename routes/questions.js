const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question, User, Answer, Vote } = require('../db/models');
const { sequelize } = require('../db/models/index');
const router = express.Router();

const csrfProtection = csrf({ cookie: true });
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', csrfProtection, async(req, res) => {
    let questions = await Question.findAll({
        include: User,
        order: [ ['updatedAt', 'DESC'] ],
    });
    questions = questions.map(el => {
        let preview = el.body.slice(0,141);
        console.log(preview)
        if (preview.length > 140) preview = preview.replace(/\s\S*$/, "") + "...";
        el.preview = preview;
        return el;
    });
    res.render('questions-list', {questions, noun: "Question"});
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

    const question = await Question.findByPk( Number(questionId),{
        include: [{
            model: User,
            attributes: ['username', 'image_link', 'id']
        }, {
            model: Answer,
            attributes: [
              'id',
              'user_id',
              'question_id',
              'body',
              'image_link1',
              'image_link2',
              'image_link3',
              [ sequelize.literal('(SELECT SUM("value") FROM "Votes" as vote WHERE vote.answer_id = "Answers".id)'), 'score' ]
            ],
            include: [  
              Vote,
              {
                model: User,
                attributes: ['username', 'image_link', 'id']
              }
            ] 
        }]
    });

    if (question) {
        res.render('question', { token: req.csrfToken(), question });
    } else {
        const error = new Error('Question not found');
        error.status = 404;
        next(error);
    }
}));

router.get('/:id(\\d+)/edit', csrfProtection, asyncHandler( async(req, res, next) => {
    const question = await Question.findByPk(req.params.id);
    if (req.session.auth && question.user_id === res.locals.user.id) {
        res.render('question-edit', { question, token: req.csrfToken() })
    } else {
        const error = new Error('Not authorized');
        error.status = 401;
        next(error);
    }
}));

router.post('/:id(\\d+)', csrfProtection, questionValidator, asyncHandler( async(req, res, next) => {
    const question = await Question.findByPk(Number(req.params.id));
    if (question) {
        if (req.session.auth && question.user_id === res.locals.user.id) {
            const { title, body, image_link1, image_link2, image_link3 } = req.body;
            
            question.title = title;
            question.body = body;
            question.image_link1 = image_link1;
            question.image_link2 = image_link2;
            question.image_link3 = image_link3;

            const validateErrors = validationResult(req);
            if (validateErrors.isEmpty()) {
                await question.save();
                res.redirect(`/questions/${question.id}`)
            } else {
                const errors = validateErrors.array().map(error => error.msg);
                res.render('question-edit', { errors, question, token: req.csrfToken() })
            }
        } else {
            const error = new Error('Not authorized');
            error.status = 401;
            next(error);
        }
    }
}));

router.post('/:id(\\d+)/delete', asyncHandler( async(req, res, next) => {
    const question = await Question.findByPk(Number(req.params.id));
    if (question) {
        if (req.session.auth && question.user_id === res.locals.user.id) {
            await question.destroy();
            res.redirect('/questions');
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
