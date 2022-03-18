let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if( req.session.auth ){
    res.redirect('/questions');
  } else {
    res.redirect('/users/signup');
  }

});

module.exports = router;
