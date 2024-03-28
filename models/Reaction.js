const { Schema, Types, model } = require('mongoose');


function dateFormat(timestamp) {
  return new Date(timestamp).toLocaleString();
}

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
      required: true,
        max_length: 280,

    },
    username: {
        type: String,
        required: true,
        },

    createdAt: {
        type: Date,
      required: true,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),

    },

  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false
  }
);




module.exports = reactionSchema;
