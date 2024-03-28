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
};

const getUser = async (req, res) => {
  try {
      const user = await User.findOne({_id: req.params.userID});
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
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

const createFriend = async (req, res) => {
  const userID = req.params.userID
  const friendID = req.params.friendID

  // find the user by id, which is a findOneAndUpdate operation
  // add the friend id to the user's friends array field, which is a $push operation

  try {
    const newUserData = await User.findOneAndUpdate(
      {
        _id: userID
      },
      {
        $push: {
          friends: friendID
        }
      },
      { new: true}
    );
    res.json(newUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
} // createFriend end

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

 const deleteFriend = async (req, res) => {
  const userID = req.params.userID
  const friendID = req.params.friendID

  // find the user by id, which is a findOneAndUpdate operation
  // add the friend id to the user's friends array field, which is a $push operation

  try {
    const newUserData = await User.findOneAndUpdate(
      {
        _id: userID
      },
      {
        $pull: {
          friends: friendID
        }
      },
      { new: true}
    );
    res.json(newUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
} // deleteFriend end

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,  
  createFriend,
  deleteFriend
};
