const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
};

const getThought = async (req, res) => {
  try {
      const thought = await Thought.findOne({_id: req.params.thoughtID});
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
} // getThought end

const createThought = async (req, res) => {
  console.log(req.body)
  try {
    const check = await Thought.create(req.body);
    res.json(check);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
} // createThought end

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.thoughtID },
     
    );

    if (!thought) {
      res.status(404).json({ message: 'didnt delete thought' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
 } // deleteThought end

const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      { 
        $pull: 
        { 
          reactions: 
          { 
            reactionId: req.params.reactionID 
          } 
        }
      },
      { runValidators: true, new: true }
    );

    if (!thought) {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
};
