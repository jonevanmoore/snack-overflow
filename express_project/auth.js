const { User } = require('./db/models');

const loginUser = (req, res, user, path = null) => {
  req.session.auth = {
    userId: user.id
  }

  req.session.save( () => {
    if (path) res.redirect(path);
  });
};

const restoreUser = async (req, res, next) => {
  console.log(req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next()
      }
    } catch (e) {
      res.locals.authenticated = false;
      next(e);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
}

const logoutUser = (req, res, path = null) => {
  req.session.destroy(e => {
    if (e) {
      console.log(e)
    }
    if (path) {
      res.redirect(path)
    }
  })
}

module.exports = {
  loginUser,
  restoreUser,
  logoutUser
}
