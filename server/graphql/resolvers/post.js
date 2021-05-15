const Post = require("../../models/Post.js");
const User = require("../../models/User.js");
const checkAuth = require("../../authentication.js");

module.exports = {
  Query: {
    findPostById: async (parent, args, context, info) => {
      const { id } = args;
      return await Post.findById(id);
    },

    findPostByUsername: async (parent, args, context, info) => {
      try {
        const { name } = args;
        let posts = await Post.find({ username: name });
        posts.reverse();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    myPost: async (parent, args, context, info) => {
      try {
        const user = await checkAuth(context);
        let posts = await Post.find({ user: user.id });
        posts.reverse();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    myFriendsPosts: async (parent, args, context, info) => {
      try {
        const userLogin = await checkAuth(context);
        const user = await User.findOne({ username: userLogin.username });
        const friendsList = user.friends.map((x) => x.username);

        friendsPost = await Promise.all(
          friendsList.map((friendName) => {
            return Post.find({ username: friendName });
          })
        );

        let posts = [];
        posts = posts.concat(...friendsPost);
        posts.reverse();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },

    allPost: async (parent, args, context, info) => {
      try {
        let posts = await Post.find();
        posts.reverse();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    /* POST */

    createPost: async (parent, args, context, info) => {
      try {
        const user = await checkAuth(context);
        const { body, image } = args;
        const post = await Post.create({
          body,
          image,
          createdAt: new Date().toISOString(),
          username: user.username,
          userpic: user.avatar,
          user: user.id,
        });
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    deletePost: async (parent, args, context, info) => {
      try {
        const { postId } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);
        if (post.username !== user.username) throw new Error("Không có quyền xóa post người khác");
        await post.delete();
        return "Post deleted successfully";
      } catch (error) {
        throw new Error(error);
      }
    },

    editPost: async (parent, args, context, info) => {
      try {
        const { postId, body, image } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);
        if (post.username !== user.username) throw new Error("Không có quyền sửa post người khác");
        post.body = body;
        post.image = image;
        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    /* LIKE */

    // like and unlike post
    likePost: async (parent, args, context, info) => {
      try {
        const { postId } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);
        const liked = post.likes.find((like) => like.username === user.username);

        if (liked) {
          post.likes = post.likes.filter((like) => like.username !== user.username);
        } else {
          post.likes.push({ username: user.username });
        }
        // number of likes
        post.likesCount = post.likes.length;

        await post.save();
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },

    /* COMMENT */

    addComment: async (parent, args, context, info) => {
      try {
        const { postId, body } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);

        const comment = {
          body: body,
          username: user.username,
          userpic: user.avatar,
          createdAt: new Date().toISOString(),
        };

        post.comments.unshift(comment);
        post.commentsCount = post.comments.length;

        await post.save();
        return comment;
      } catch (error) {
        throw new Error(error);
      }
    },

    editComment: async (parent, args, context, info) => {
      try {
        const { postId, commentId, body } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);

        const index = post.comments.findIndex((c) => {
          return c.id === commentId;
        });

        const userOfComment = post.comments[index].username;
        if (userOfComment !== user.username) throw new Error("Không có quyền sửa comment người khác");
        post.comments[index].body = body;
        await post.save();

        return post.comments[index];
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteComment: async (parent, args, context, info) => {
      try {
        const { postId, commentId } = args;
        const user = await checkAuth(context);
        const post = await Post.findById(postId);

        const index = post.comments.findIndex((c) => {
          return c.id === commentId;
        });

        const userOfComment = post.comments[index].username;
        if (userOfComment !== user.username) throw new Error("Không có quyền xóa comment người khác");
        post.comments.splice(index, 1);

        // number of commments
        post.commentsCount = post.comments.length;

        await post.save();
        return "Comment deleted successfully";
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
