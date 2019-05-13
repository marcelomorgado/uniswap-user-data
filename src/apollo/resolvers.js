import {
  GET_USERS,
  USERS_PER_PAGE,
  GET_USER_TRANSACTIONS,
  TRANSACTIONS_PER_PAGE,
} from "./queries";
import BigNumber from "bignumber.js";
import { TokenPurchase, EthPurchase } from "../constants/TransactionEvent";

// Tech-debt: DRY function
const addToEtherBalance = (user, amount) => {
  const amountBN = new BigNumber(amount);
  let { etherBalance } = user;
  const etherBalanceBN = new BigNumber(etherBalance);
  etherBalance = etherBalanceBN.plus(amountBN).toString();
  user = { ...user, etherBalance };
  return user;
};

// Tech-debt: DRY function
const subtractFromEtherBalance = (user, amount) => {
  const amountBN = new BigNumber(amount);
  let { etherBalance } = user;
  const etherBalanceBN = new BigNumber(etherBalance);
  etherBalance = etherBalanceBN.minus(amountBN).toString();
  user = { ...user, etherBalance };
  return user;
};

const updateBalances = async ({ from, to, amount }, cache) => {
  const data = cache.readQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
  });

  data.users = data.users.map(user =>
    user.id === from ? subtractFromEtherBalance(user, amount) : user
  );

  data.users = data.users.map(user =>
    user.id === to ? addToEtherBalance(user, amount) : user
  );

  await cache.writeQuery({
    query: GET_USERS,
    variables: {
      itemsPerPage: USERS_PER_PAGE,
    },
    data,
  });
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const insertTransaction = async ({ tx, userId }, cache) => {
  let data;

  try {
    data = cache.readQuery({
      query: GET_USER_TRANSACTIONS,
      variables: {
        userId,
        itemsPerPage: TRANSACTIONS_PER_PAGE,
      },
    });
  } catch (error) {
    data = { transactions: [] };
  }

  // Tech debt: How is the best way to pick up a temp ID?
  const tempId = getRandomInt(1000000, 10000000);

  tx = { ...tx, id: `${tempId}` };
  data.transactions = [tx, ...data.transactions];

  await cache.writeQuery({
    query: GET_USER_TRANSACTIONS,
    variables: {
      userId,
      itemsPerPage: TRANSACTIONS_PER_PAGE,
    },
    data,
  });
};

const sendEther = async (_, { from, to, amount }, { cache }) => {
  await updateBalances({ from, to, amount }, cache);

  try {
    const baseTx = {
      tx: "txhash",
      tokenAddress: "0x123",
      tokenSymbol: "DAI",
      ethAmount: amount,
      tokenAmount: "0",
      __typename: "Transaction",
    };

    const fromTx = {
      ...baseTx,
      event: TokenPurchase,
      user: from,
    };
    const toTx = {
      ...baseTx,
      event: EthPurchase,
      user: to,
    };

    await insertTransaction({ tx: fromTx, userId: from }, cache);
    await insertTransaction({ tx: toTx, userId: to }, cache);
  } catch (error) {
    console.log(error);
  }

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

export const resolvers = {
  Mutation: {
    sendEther,
  },
  User: {
    etherBalance: () => "10",
  },
};

export default { resolvers, typeDefs };
