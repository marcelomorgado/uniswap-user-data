import React from "react";
import UsersScreen from "./screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GET_USERS, USERS_PER_PAGE } from "./queries";
import BigNumber from "bignumber.js";

//https://github.com/apollographql/fullstack-tutorial
// https://www.apollographql.com/docs/react/recipes/client-schema-mocking
const cache = new InMemoryCache();

const typeDefs = `
  extend type User {
    etherBalance: String!
  }

  type Mutation {
    updateUsers(users: [User]!)
    updateUserEtherBalance(userId: String!, etherBalance: String)
    sendEther(from: String!, to: String!, amount: String)
  }
`;

const resolvers = {
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

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
  cache,
  clientState: {
    //https://codesandbox.io/s/l99l9r1ml9
    resolvers,
    typeDefs,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <UsersScreen />
    </ApolloProvider>
  );
}

export default App;
