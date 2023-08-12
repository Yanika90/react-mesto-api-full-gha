const jwt = require('jsonwebtoken');

const Unauthorized = require('../utils/unauthorized');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  if (!req.cookies) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   return next(new Unauthorized('Необходима авторизация'));
  // }

  // const token = authorization.replace('Bearer ', '');
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
