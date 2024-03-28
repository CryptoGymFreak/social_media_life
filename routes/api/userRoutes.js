const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/
router.route('/').get(getAllUsers).post(createUser);
//router.route('/').get(getAllUsers);

// /api/user/:userID
router.route('/:userID').get(getUser).put(updateUser).delete(deleteUser);

// /api/users/:userID/friends/:friendID
router.route('/:userID/friends/:friendID').post(createFriend).delete(deleteFriend);

module.exports = router;