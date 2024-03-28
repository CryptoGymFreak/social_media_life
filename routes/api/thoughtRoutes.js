const router = require('express').Router();
const {
  getAllThought,
  getThought,
  createThought,
  updateThought,
  deleteThought
} = require('../../controllers/thoughtController');

// /api/
router.route('/').get(getAllThought).post(createThought);
//router.route('/').get(getAllUsers);

// /api/user/:userId
router.route('/:userID').get(getThought).put(updateThought).delete(deleteThought);






module.exports = router;
