const { Schema, model } = require('mongoose');
//const assignmentSchema = require('./Assignment');
//const userSchema = require('./User');
// Schema to create Student model

/*



  friends
Array of _id values referencing the User model (self-reference)
*/

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // strVal.trim()
      max_length: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

const User = model('user', userSchema);

module.exports = User;
