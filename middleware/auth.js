// authenticator middleware

async function authenticator(req, res, next) {
  // if the user is not authenticated then redirect to the login screen, otherwise continue
  if (!req.session.userid) {
    res.status(400).send(false);
  } else {
    next();
  }
}

module.exports = authenticator;
