let express = require('express');
const bcrypt = require('bcryptjs');
const csrf = require("csurf");
const { User, Answer, Question } = require('../db/models');
const { check, validationResult } = require('express-validator');
let router = express.Router();

const { loginUser, logoutUser } = require('../auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const csrfProtection = csrf({ cookie: true });

const validateUser = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please use an appropriate username.")
    .isLength({ max: 20 })
    .withMessage("Username is too long.")
    .custom(value => {
      return !/\s/.test(value)
    })
    .withMessage("Username must not have spaces"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please use an appropriate email address."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please use an appropriate password."),
  check("confirm_password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
    .withMessage("Please use the same password."),
];
/*GET /signup form */
router.get('/signup', csrfProtection, (req, res) => {
  res.render('signup', { token: req.csrfToken() })
});
/*POST /signup */
router.post('/signup', validateUser, csrfProtection, asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  const user = User.build({
    username,
    email,
    password,
  });

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashed_password = hashedPassword;
    try {
      await user.save();
      loginUser(req, res, user, '/');
    } catch (e) {
      console.log(e);
      const errors = e.errors.map(error => error.message);
      res.render('signup', {
        title: 'Sign Up',
        user,
        errors,
        token: req.csrfToken(),
      });
    }
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('signup', {
      title: 'Sign Up',
      user,
      errors,
      token: req.csrfToken(),
    });
  }
}));

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    token: req.csrfToken(),
  });
});

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const passwordMatches = await bcrypt.compare(password, user.hashed_password.toString());
        if (passwordMatches) {
          loginUser(req, res, user, '/');

          return;
        }
      }
      errors.push('Login failed');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('user-login', {
      title: 'Login',
      email,
      errors,
      token: req.csrfToken(),
    });
  }));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
});

router.get('/demologin', csrfProtection, asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(1);
  let errors = [];

  if (user) {
    loginUser(req, res, user, '/');
    return;
  }

  errors.push('Login failed: no user#1');

  res.render('user-login', {
    title: 'Login',
    errors,
    token: req.csrfToken(),
  });
}));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
});


router.get('/logout', (req, res) => {
  logoutUser(req, res, '/users/login')
});

router.get('/:id(\\d+)', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  const user_id = user.id

  const answers = await Answer.findAll({
    where: { user_id }
  })
  const questions = await Question.findAll({
    where: { user_id }
  })

  const randomPics = [
    "https://s3.crackedcdn.com/phpimages/article/4/8/6/768486.jpg",
    "https://www.denverpost.com/wp-content/uploads/2016/05/20110819__20110820_B06_BZ20KINGSHELFp1.jpg",
    "https://img.buzzfeed.com/buzzfeed-static/static/2015-07/16/11/campaign_images/webdr01/the-truth-behind-your-favorite-food-mascots-2-2677-1437059125-6_dblbig.jpg",
    "https://loonietimes.com/wp-content/uploads/2019/07/Maple-leaf-Food.jpg"
  ]
  const pic = randomPics[Math.floor(Math.random() * randomPics.length)]

  res.render("profile-page", { user, answers, questions, pic })
})
module.exports = router;
