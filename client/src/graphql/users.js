import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(fields: { username: $username, password: $password }) {
      id
      username
      avatar
      from
      hobbies
      relationship
      # friends {
      #   username
      #   userpic
      # }
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    register(fields: { username: $username, password: $password }) {
      id
      username
      avatar
      from
      hobbies
      relationship
      # friends {
      #   username
      #   userpic
      # }
      token
    }
  }
`;

export const ALL_USER = gql`
  query {
    getAllUsers {
      id
      username
      avatar
    }
  }
`;

export const GET_FRIEND = gql`
  query {
    getFriends {
      id
      username
      userpic
    }
  }
`;

export const GET_USER = gql`
  query getUser($name: String!) {
    getUser(name: $name) {
      id
      username
      avatar
      from
      hobbies
      relationship
      friends {
        username
        userpic
      }
      friendsCount
    }
  }
`;

export const REQUEST_FRIEND = gql`
  mutation requestFriend($username: String!) {
    requestFriend(username: $username) {
      username
    }
  }
`;
