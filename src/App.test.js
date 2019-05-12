// import React from "react";
// import ReactDOM from "react-dom";
//import App from "./App";
import fetch from "node-fetch";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import BigNumber from "bignumber.js";
import { toTokenTransactions, toEtherTransactions } from "./helpers";
import { IN, OUT } from "./constants/TransactionType";

import ApolloClient from "apollo-client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
});

jest.setTimeout(10000);

// TODO: Inject Apollo Mock
// it.skip("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

// const getUsers = async () => {
//   const result = await client.query({
//   query: gql`
//     {
//       users {
//         id
//       }
//     }
//   `,
// });
//
//   const { data } = result;
//   const { users } = data;
//   return users;
// };

const getUserTransactions = async userID => {
  const result = await client.query({
    query: gql`
      {
        transactions (where: { user: "${userID}" } ) {
          id
          tx
          event
          block
          timestamp
          exchangeAddress
          tokenAddress
          tokenSymbol
          user
          ethAmount
          tokenAmount
          fee
        }
      }
    `,
  });

  const { data } = result;
  const { transactions } = data;
  return transactions;
};

const getUserTokenTransactions = async userID => {
  const userTransactions = await getUserTransactions(userID);

  return toTokenTransactions(userTransactions);
};

const getUserEtherTransactions = async userID => {
  const userTransactions = await getUserTransactions(userID);

  return toEtherTransactions(userTransactions);
};

const extractBalanceFromTransactions = transactions => {
  const balance = transactions.reduce((total, tx) => {
    return tx.type === IN ? total.plus(tx.amount) : total.minus(tx.amount);
  }, new BigNumber(0));
  return balance;
};

const getUserEtherBalance = async userID => {
  const etherTransactions = await getUserEtherTransactions(userID);
  const etherBalance = extractBalanceFromTransactions(etherTransactions);
  return etherBalance;
};

it("should calculate balance from transactions", () => {
  const transactions = [
    { type: IN, amount: "1.123" },
    { type: IN, amount: "10.144423" },
    { type: OUT, amount: "5" },
  ];

  const balance = extractBalanceFromTransactions(transactions);
  expect(balance).toEqual(new BigNumber("6.267423"));
});

it("should fetch user ether balance", async () => {
  const anUserID = "0x000000000a3c7c86345a35a0e97a4bb4370a8dd9";
  const userEtherBalance = await getUserEtherBalance(anUserID);
  expect(userEtherBalance).toBeDefined();
});

it("should fetch user token transactions", async () => {
  const anUserID = "0x000000000a3c7c86345a35a0e97a4bb4370a8dd9";
  const userEtherTransactions = await getUserTokenTransactions(anUserID);

  userEtherTransactions.forEach(tx => {
    const { user, tokenAddress, amount } = tx;
    expect(user).toEqual(anUserID);
    expect(tokenAddress).not.toEqual("0x");
    expect(amount).toBeDefined();
  });
});

it("should fetch user eth transactions", async () => {
  jest.setTimeout(10000);

  const anUserID = "0x000000000a3c7c86345a35a0e97a4bb4370a8dd9";
  const userEtherTransactions = await getUserEtherTransactions(anUserID);

  userEtherTransactions.forEach(tx => {
    const { user, tokenAddress, amount } = tx;
    expect(user).toEqual(anUserID);
    expect(tokenAddress).toEqual("0x");
    expect(amount).toBeDefined();
  });
});
