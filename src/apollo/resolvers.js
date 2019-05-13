import { GET_USERS, USERS_PER_PAGE } from "./queries";
import BigNumber from "bignumber.js";

export const resolvers = {
  Mutation: {
    updateUsers: async (_, { users }, { cache }) => {
      await cache.writeData({ data: { users } });
      return null;
    },
    updateUserEtherBalance: async (_, { userId, etherBalance }, { cache }) => {
      const data = cache.readQuery({
        query: GET_USERS,
        variables: {
          itemsPerPage: USERS_PER_PAGE,
        },
      });

      data.users = data.users.map(u => {
        return u.id !== userId ? u : { ...u, etherBalance };
      });

      await cache.writeQuery({
        query: GET_USERS,
        variables: {
          itemsPerPage: 20,
        },
        data,
      });

      return null;
    },
    sendEther: async (_, { from, to, amount }, { cache }) => {
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
    },
  },
  User: {
    etherBalance: () => "10",
  },
};

export default { resolvers };
