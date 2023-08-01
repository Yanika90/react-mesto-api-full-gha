const Card = require('../models/card');
const { OK, CREATED } = require('../utils/status-code');
const BadRequest = require('../utils/bad-request');
const NotFound = require('../utils/not-found');
const ErrorAccess = require('../utils/error-access');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch(next);
}; // get

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequest('Переданы некорректные данные для создания карточки')
        );
      }
      return next(err);
    });
}; // post

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      if (String(card.owner) !== String(req.user._id)) {
        return next(new ErrorAccess('Вы не можете удалить эту карточку'));
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные карточки'));
      }
      return next(err);
    });
}; // delete

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(new NotFound('Передан несуществующий _id карточки'))
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequest(
            'Переданы некорректные данные для постановки/снятии лайка'
          )
        );
      }
      return next(err);
    });
}; // put

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(new NotFound('Передан несуществующий _id карточки'))
    .then((card) => res.status(OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequest(
            'Переданы некорректные данные для постановки/снятии лайка'
          )
        );
      }
      return next(err);
    });
}; // delete
