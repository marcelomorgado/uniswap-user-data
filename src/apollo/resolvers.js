import { GET_USERS, USERS_PER_PAGE } from "./queries";
import BigNumber from "bignumber.js";

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

const sendEther = async (_, { from, to, amount }, { cache }) => {
  const amountBN = new BigNumber(amount);

  const data = cache.readQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
  });

  // Subtracting
  data.users = data.users.map(user => {
    const { id: userId, etherBalance } = user;
    if (userId === from) {
      const etherBalanceBN = new BigNumber(etherBalance);
      const newBalance = etherBalanceBN.minus(amountBN).toString();
      user = { ...user, etherBalance: newBalance };
    }

    return user;
  });

  // Adding
  data.users = data.users.map(user => {
    const { id: userId, etherBalance } = user;
    if (userId === to) {
      const etherBalanceBN = new BigNumber(etherBalance);
      const newBalance = etherBalanceBN.plus(amountBN).toString();
      user = { ...user, etherBalance: newBalance };
    }

    return user;
  });

  await cache.writeQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
    data,
  });

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
