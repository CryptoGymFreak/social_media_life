const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

// /api/
router.route('/').get(getAllUsers).post(createUser);
//router.route('/').get(getAllUsers);

// /api/user/:userId
router.route('/:userID').get(getUser).put(updateUser).delete(deleteUser);






module.exports = router;
