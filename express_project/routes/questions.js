const express = require('express');
const csrf = require('csurf');
const { check, validationResult } = require('express-validator');
const { Question } = require('../db/models');
const { restoreUser } = require('../auth');
const router = express.Router();

const csrfProtection = csrf({cookie: true});
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', csrfProtection, asyncHandler( async(req, res) => {
    res.render('question-create', {token: req.csrfToken()});
}));

module.exports = router;