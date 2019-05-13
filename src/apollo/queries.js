import { gql } from "apollo-boost";

export const USERS_PER_PAGE = 20;

export const GET_USERS = gql`
  query User($itemsPerPage: Int) {
    users(first: $itemsPerPage) {
      id
      etherBalance @client
    }
  }
`;

export const GET_MORE_USERS = gql`
  query User($cursor: String, $itemsPerPage: Int) {
    users(first: $itemsPerPage, where: { id_gt: $cursor }) {
      id
      etherBalance @client
    }
  }
`;

// export const UPDATE_USERS = gql`
//   mutation updateUsers($users: [User]!) {
//     updateUsers(users: $users) @client
//   }
// `;
//
// export const UPDATE_USER = gql`
//   mutation updateUserEtherBalance($userId: String!, $etherBalance: String) {
//     updateUserEtherBalance(userId: $userId, etherBalance: $etherBalance) @client
//   }
// `;

export const SEND_ETHER = gql`
  mutation sendEther($from: String!, $to: String!, $amount: String) {
    sendEther(from: $from, to: $to, amount: $amount) @client
  }
`;

export const TRANSACTIONS_PER_PAGE = 15;

export const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!, $itemsPerPage: Int) {
    transactions(first: $itemsPerPage, where: { user: $userId }) {
      id
      tx
      event
      tokenAddress
      tokenSymbol
      user
      ethAmount
      tokenAmount
    }
  }
`;

export const GET_MORE_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!, $cursor: String, $itemsPerPage: Int) {
    transactions(
      first: $itemsPerPage
      where: { user: $userId, id_lt: $cursor }
    ) {
      id
      tx
      event
      tokenAddress
      tokenSymbol
      user
      ethAmount
      tokenAmount
    }
  }
`;

export default {
  GET_USERS,
  // UPDATE_USERS,
  // UPDATE_USER,
  GET_MORE_USERS,
  TRANSACTIONS_PER_PAGE,
  GET_MORE_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS,
  USERS_PER_PAGE,
  SEND_ETHER,
};
