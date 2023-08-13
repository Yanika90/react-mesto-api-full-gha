const router = require('express').Router();

const {
  validationCreateCard,
  validationDeleteCard,
  validationLikeCard,
  validationDislikeCard,
} = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validationCreateCard, createCard);
router.delete('/:cardId', validationDeleteCard, deleteCard);
router.put('/:cardId/likes', validationLikeCard, likeCard);
router.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = router;
