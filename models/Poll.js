const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  heading: {
    type: String,
    required: true,
  },

  options: [String],

  voteCounts: [Number],

  voters: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("poll", PollSchema);
