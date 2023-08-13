const router = require('express').Router();

const {
  validationGetUserId,
  validationUpdateUserInfo,
  validationChangeUserAvatar,
} = require('../middlewares/validation');

const {
  getUsers,
  getCurrentUserInfo,
  updateUserInfo,
  getUserId,
  changeUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUserInfo);
router.patch('/me', validationUpdateUserInfo, updateUserInfo);
router.get('/:userId', validationGetUserId, getUserId);
router.patch('/me/avatar', validationChangeUserAvatar, changeUserAvatar);

module.exports = router;
