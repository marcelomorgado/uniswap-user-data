import React from "react";
import UsersScreen from "./screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers } from "./apollo/resolvers";

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
