import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";

import ApolloClient from "apollo-client";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it.skip("fetching data", async () => {
  jest.setTimeout(10000);
  const client = new ApolloClient({
    link: createHttpLink({
      uri: "https://48p1r2roz4.sse.codesandbox.io",
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const result = await client.query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  });
  console.log(result);
});
