const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    avatar: String!
    from: String!
    hobbies: String!
    relationship: String!
    friends: [Friend]!
    friendsCount: Int!
    token: String!
  }

  type Friend {
    id: ID!
    username: String!
    userpic: String!
  }

  type Post {
    id: ID!
    body: String!
    image: String!
    username: String!
    userpic: String!
    comments: [Comment]!
    likes: [Like]!
    commentsCount: Int!
    likesCount: Int!
    createdAt: String!
  }

  type Comment {
    id: ID!
    username: String!
    userpic: String!
    body: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
  }

  input AuthInput {
    username: String!
    password: String!
  }

  # QUERY
  type Query {
    # User
    getAllUsers: [User]!
    getFriends: [Friend]!
    getUser(name: String!): User!
    # Post
    findPostById(id: ID!): Post!
    findPostByUsername(name: String!): [Post]!
    myPost: [Post]!
    allPost: [Post]!
    myFriendsPosts: [Post]!
  }

  # MUTATION
  type Mutation {
    # User
    register(fields: AuthInput!): User!
    login(fields: AuthInput!): User!
    requestFriend(username: String!): [Friend]!
    # Post
    createPost(body: String!, image: String!): Post!
    editPost(postId: ID!, body: String!, image: String!): Post!
    deletePost(postId: ID!): String!
    # Interact with post
    likePost(postId: ID!): Post!
    addComment(postId: ID!, body: String!): Comment!
    editComment(postId: ID!, commentId: ID!, body: String!): Comment!
    deleteComment(postId: ID!, commentId: ID!): String!
  }
`;
