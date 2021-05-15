const User = require("../../models/User.js");
const checkAuth = require("../../authentication.js");
const { avatar: pictures, from: countries, hobbies: interests, relationship: status } = require("../../random.js");

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

module.exports = {
  Query: {
    getAllUsers: async () => {
      try {
        const allUsers = await User.find();
        return allUsers;
      } catch (error) {
        throw new Error(error);
      }
    },

    getFriends: async (parent, args, context, info) => {
      try {
        const { username } = await checkAuth(context);
        const user = await User.findOne({ username });
        return user.friends;
      } catch (error) {
        throw new Error(error);
      }
    },

    getUser: async (parent, args, context, info) => {
      try {
        const { name } = args;
        const user = await User.findOne({ username: name });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    // USER REGISTER
    register: async (parent, args, context, info) => {
      try {
        let { username } = args.fields;
        const userExisted = await User.findOne({ username });
        if (userExisted) throw new Error("User đã tồn tại!");
        // info
        const avatar = random_item(pictures);
        const from = random_item(countries);
        const hobbies = interests
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .join(", ");
        const relationship = random_item(status);
        // end info

        const user = await User.create({ ...args.fields, avatar, from, hobbies, relationship });
        const token = await user.generateToken();
        return { ...user._doc, id: user._id, token };
      } catch (error) {
        throw new Error(error);
      }
    },

    // USER LOGIN
    login: async (parent, args, context, info) => {
      try {
        let { username, password } = args.fields;

        const userExisted = await User.findOne({ username });
        if (!userExisted) throw new Error("User không tồn tại!");
        const check = await userExisted.comparePassword(password);
        if (!check) throw new Error("Password không chính xác");

        const token = await userExisted.generateToken();
        return { ...userExisted._doc, id: userExisted._id, token };
      } catch (error) {
        throw new Error(error);
      }
    },

    // ADD / REMOVE FRIEND
    requestFriend: async (parent, args, context, info) => {
      try {
        const userLogin = await checkAuth(context);
        const { username: friendName } = args;
        const user = await User.findOne({ username: userLogin.username });
        const friend = await User.findOne({ username: friendName });

        if (!friend) throw new Error("Không thể kết bạn với người không tồn tại");
        if (user.username === friendName) throw new Error("Không thể kết bạn với bản thân");
        const check = user.friends.find((x) => x.username === friendName);

        if (check) {
          user.friends = user.friends.filter((x) => x.username !== friendName);
          friend.friends = friend.friends.filter((x) => x.username !== userLogin.username);
        } else {
          user.friends.push({ username: friendName, userpic: friend.avatar });
          friend.friends.push({ username: userLogin.username, userpic: userLogin.avatar });
        }
        // number of friends
        user.friendsCount = user.friends.length;
        friend.friendsCount = friend.friends.length;

        await user.updateOne({
          friendsCount: user.friendsCount,
          friends: user.friends,
        });

        await friend.updateOne({
          friendsCount: friend.friendsCount,
          friends: friend.friends,
        });
        return user.friends;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
