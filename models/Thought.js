const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


/*
thoughtText
String
Required
Must be between 1 and 280 characters

createdAt
Date
Set default value to the current timestamp
Use a getter method to format the timestamp on query

username (The user that created this thought)
String
Required

reactions (These are like replies)
Array of nested documents created with the reactionSchema
*/

function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1, // strVal.trim()
      max_length: 280,
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),

    },
    username: {
        type: String,
        required: true,
        max_length: 20,
        trim: true
    },

    // nesting schema
    // aka subdocuments
    // reactions: [{reactionText:"..", username:".."}, {reactionText:"..", username:".."}],
    reactions: [reactionSchema]
    // reactions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
    // ],
  },
  {
    toJSON: {
      virtual: true,
      getters: true,
    },
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
