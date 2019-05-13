import React from "react";
import UsersScreen from "./components/screens/UsersScreen";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { resolvers, typeDefs } from "./apollo/resolvers";

const cache = new InMemoryCache();

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
