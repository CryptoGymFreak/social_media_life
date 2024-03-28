const router = require('express').Router();
const {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/
router.route('/').get(getAllThoughts).post(createThought);
//router.route('/').get(getAllUsers);

// /api/user/:userId
router.route('/:thoughtID').get(getThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtID/reactions/
router.route('/:thoughtID/reactions/').post(createReaction)

// /api/thought/:thoughtID/reactions/:reactionID
router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);





module.exports = router;
