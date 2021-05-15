import { gql } from "@apollo/client";

export const ALL_POST = gql`
  query {
    allPost {
      id
      body
      image
      username
      userpic
      comments {
        id
        username
        userpic
        body
        createdAt
      }
      likes {
        username
      }
      commentsCount
      likesCount
      createdAt
    }
  }
`;

export const MY_POST = gql`
  query {
    myPost {
      id
      body
      image
      username
      userpic
      comments {
        id
        username
        userpic
        body
        createdAt
      }
      likes {
        username
      }
      commentsCount
      likesCount
      createdAt
    }
  }
`;

export const FRIEND_POST = gql`
  query {
    myFriendsPosts {
      id
      body
      image
      username
      userpic
      comments {
        id
        username
        userpic
        body
        createdAt
      }
      likes {
        username
      }
      commentsCount
      likesCount
      createdAt
    }
  }
`;

export const USER_POST = gql`
  query findPostByUsername($name: String!) {
    findPostByUsername(name: $name) {
      id
      body
      image
      username
      userpic
      comments {
        id
        username
        userpic
        body
        createdAt
      }
      likes {
        username
      }
      commentsCount
      likesCount
      createdAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!, $image: String!) {
    createPost(body: $body, image: $image) {
      username
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const EDIT_POST = gql`
  mutation editPost($postId: ID!, $body: String!, $image: String!) {
    editPost(postId: $postId, body: $body, image: $image) {
      username
    }
  }
`;

export const COMMENT_POST = gql`
  mutation addComment($postId: ID!, $body: String!) {
    addComment(postId: $postId, body: $body) {
      username
    }
  }
`;

export const EDIT_COMMENT_POST = gql`
  mutation editComment($postId: ID!, $commentId: ID!, $body: String!) {
    editComment(postId: $postId, commentId: $commentId, body: $body) {
      username
    }
  }
`;

export const DELETE_COMMENT_POST = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      username
    }
  }
`;
