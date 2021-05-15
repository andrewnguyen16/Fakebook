const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  avatar: String,
  password: { type: String, required: true },
  friends: [
    {
      username: String,
      userpic: String,
    },
  ],
  friendsCount: { type: Number, default: 0 },
  from: String,
  hobbies: String,
  relationship: String,
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (passwordNotHashed) {
  return await bcrypt.compare(passwordNotHashed, this.password);
};

userSchema.methods.generateToken = async function () {
  return await jwt.sign(
    {
      username: this.username,
      id: this._id,
      avatar: this.avatar,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
};

module.exports = model("User", userSchema);
