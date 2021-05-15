const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  image: {
    type: String,
    default: "",
  },
  username: String,
  userpic: String,
  comments: [
    {
      body: String,
      username: String,
      userpic: String,
      createdAt: String,
    },
  ],
  commentsCount: { type: Number, default: 0 },
  likes: [{ username: String }],
  likesCount: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: String,
});

module.exports = model("Post", postSchema);
