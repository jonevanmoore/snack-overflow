let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*GET /signup form */
router.get('/signup', (req, res) => {
  const {username, hashed_password, email, bio} = req.body;
  res.render('', {})
});

module.exports = router;
