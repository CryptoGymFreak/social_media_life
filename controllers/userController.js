const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  res.json({});
};

const getUser = async (req, res) => {
  try {
      const user = await User.findOne({_id: req.params.userID});
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  res.json({});
} // getUser end

const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const check = await User.create({
      username: req.body.username,
      email: req.body.email
    });
    res.json(check);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
} // createUser end

const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userID },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(
      { _id: req.params.userID },
     
    );

    if (!user) {
      res.status(404).json({ message: 'didnt delete user' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
 } // deleteUser end

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
