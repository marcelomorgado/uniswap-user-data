import React from "react";
import UsersScreen from "./screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers, typeDefs } from "./apollo/resolvers";

//https://github.com/apollographql/fullstack-tutorial
// https://www.apollographql.com/docs/react/recipes/client-schema-mocking
const cache = new InMemoryCache();

// link: createHttpLink({
//   uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
//   fetch: fetch,
// }),

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
  cache,
  clientState: {
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
