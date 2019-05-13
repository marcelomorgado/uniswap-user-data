import React from "react";
import UsersScreen from "./screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

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
  }
`;

const resolvers = {
  Mutation: {
    updateUsers: async (_, { users }, { cache }) => {
      await cache.writeData({ data: { users } });
      return null;
    },
    updateUserEtherBalance: async (_, { userId, etherBalance }, { cache }) => {
      //await cache.writeData({ data: { userId } });

      return null;
    },
  },
  User: {
    etherBalance: () => "0",
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
