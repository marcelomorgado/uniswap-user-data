import React from "react";
import UsersScreen from "./screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
  cache,
  /* the magic */
  clientState: {
    //   defaults: { transactions: [], users: [] },
    resolvers: {
      Mutation: {
        updateUsers: async (_, { users }, { cache, getCacheKey }) => {
          //const users = await cache.
          await cache.writeData({ data: { users } });
          return null;
        },
      },
    },
    typeDefs: `
      type Mutation {
        updateUsers(users: [User]!)
      }
      `,
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
