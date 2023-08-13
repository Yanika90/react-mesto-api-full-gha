const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { OK, CREATED } = require('../utils/status-code');
const BadRequest = require('../utils/bad-request');
const NotFound = require('../utils/not-found');
const NotUnique = require('../utils/not-unique');

// все юзеры
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
}; // get

// текущий зареганный юзер
module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Пользователь по указанному _id не найден'))
    .then((users) => res.status(OK).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан некорректный _id пользователя'));
      }
      return next(err);
    });
}; // get

// находим пользователя по айди
module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound('Пользователь по указанному _id не найден'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Передан некорректный _id пользователя'));
      }
      return next(err);
    });
}; // get

// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(CREATED).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Допущена ошибка'));
      }
      if (err.code === 11000) {
        return next(
          new NotUnique('Пользователь с такими данными уже существует')
        );
      }
      return next(err);
    });
}; // post

// редачим
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFound('Пользователь с указанным _id не найден.'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequest('Переданы некорректные данные при обновлении профиля')
        );
      }
      return next(err);
    });
}; // patch

module.exports.changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFound('Пользователь с указанным _id не найден'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequest('Переданы некорректные данные при обновлении аватара')
        );
      }
      return next(err);
    });
}; // patch

// логинимся
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      });
      res.send({
        message: 'Авторизация прошла успешно',
        user: {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  if (res.cookie) {
    res.clearCookie('jwt');
    res.send({ message: 'Успешный выход из аккаунта' });
  }
};
