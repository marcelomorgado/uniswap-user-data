import {
  GET_USERS,
  USERS_PER_PAGE,
  GET_USER_TRANSACTIONS,
  TRANSACTIONS_PER_PAGE,
} from "./queries";
import BigNumber from "bignumber.js";
import {
  TokenPurchase,
  EthPurchase,
  AddLiquidity,
  RemoveLiquidity,
} from "../constants/TransactionEvent";
// const updateUsers = async (_, { users }, { cache }) => {
//   await cache.writeData({ data: { users } });
//   return null;
// };
//
// const updateUserEtherBalance = async (
//   _,
//   { userId, etherBalance },
//   { cache }
// ) => {
//   const data = cache.readQuery({
//     query: GET_USERS,
//     variables: {
//       itemsPerPage: USERS_PER_PAGE,
//     },
//   });
//
//   data.users = data.users.map(u => {
//     return u.id !== userId ? u : { ...u, etherBalance };
//   });
//
//   await cache.writeQuery({
//     query: GET_USERS,
//     variables: {
//       itemsPerPage: 20,
//     },
//     data,
//   });
//
//   return null;
// };

// Tech-debt: DRY function
const addToEtherBalance = (user, amount) => {
  const amountBN = new BigNumber(amount);
  let { etherBalance } = user;
  const etherBalanceBN = new BigNumber(etherBalance);
  etherBalance = etherBalanceBN.plus(amountBN).toString();
  user = { ...user, etherBalance };
  return user;
};

// Tech-debt: DRY function
const subtractFromEtherBalance = (user, amount) => {
  const amountBN = new BigNumber(amount);
  let { etherBalance } = user;
  const etherBalanceBN = new BigNumber(etherBalance);
  etherBalance = etherBalanceBN.minus(amountBN).toString();
  user = { ...user, etherBalance };
  return user;
};

const updateBalances = async ({ from, to, amount }, cache) => {
  const data = cache.readQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
  });

  data.users = data.users.map(user =>
    user.id === from ? subtractFromEtherBalance(user, amount) : user
  );

  data.users = data.users.map(user =>
    user.id === to ? addToEtherBalance(user, amount) : user
  );

  await cache.writeQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
    data,
  });
};

const sendEther = async (_, { from, to, amount }, { cache }) => {
  await updateBalances({ from, to, amount }, cache);

  // TXs
  try {
    const data = cache.readQuery({
      query: GET_USER_TRANSACTIONS,
      variables: {
        userId: from,
        itemsPerPage: TRANSACTIONS_PER_PAGE,
      },
    });

    const tx = {
      id: "1234",
      tx: "txhash",
      event: TokenPurchase,
      tokenAddress: "0x123",
      tokenSymbol: "DAI",
      user: from,
      ethAmount: amount,
      tokenAmount: "0",
      __typename: "Transaction",
    };

    data.transactions = [tx, ...data.transactions];

    // data.users = data.users.map(user =>
    //   user.id === from ? subtractFromEtherBalance(user, amount) : user
    // );
    //
    // data.users = data.users.map(user =>
    //   user.id === to ? addToEtherBalance(user, amount) : user
    // );

    await cache.writeQuery({
      query: GET_USER_TRANSACTIONS,
      variables: {
        userId: from,
        itemsPerPage: TRANSACTIONS_PER_PAGE,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const typeDefs = `
  extend type User {
    etherBalance: String!
  }

  type Mutation {
    sendEther(from: String!, to: String!, amount: String)
  }
`;

// type Mutation {
//   updateUsers(users: [User]!)
//   updateUserEtherBalance(userId: String!, etherBalance: String)
//   sendEther(from: String!, to: String!, amount: String)
// }

export const resolvers = {
  Mutation: {
    // updateUsers,
    // updateUserEtherBalance,
    sendEther,
  },
  User: {
    etherBalance: () => "10",
  },
};

export default { resolvers, typeDefs };
