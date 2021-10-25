const checkIfLoggedIn = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role_id !== 1) {
      next();
    } else {
      req.flash(
        'error_messages',
        'You may be trying to access the Admin Update page instead'
      );
      res.redirect('/');
    }
  } else {
    req.flash(
      'error_messages',
      'This page is only accessible to registered users who have logged in'
    );
    res.redirect('/user/login');
  }
};

const checkIfSuperUser = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role_id === 1) {
      next();
    } else {
      req.flash(
        'error_messages',
        'This page is only accessible to system administrators'
      );
      res.redirect('/');
    }
  } else {
    req.flash(
      'error_messages',
      'This page is only accessible to registered users who have logged in'
    );
    res.redirect('/user/login');
  }
};

module.exports = {
  checkIfLoggedIn,
  checkIfSuperUser,
};
