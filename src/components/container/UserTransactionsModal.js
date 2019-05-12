import React from "react";
import PropTypes from "prop-types";
import TransactionsModal from "../presentational/TransactionsModal";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!, $cursor: String) {
    transactions(first: 15, where: { user: $userId }, after: $cursor) {
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
`;

const UserTransactionsModal = ({ userId, open, handleOpen, handleClose }) => {
  return (
    <Query query={GET_USER_TRANSACTIONS} variables={{ userId }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const { transactions } = data;

        return (
          <TransactionsModal
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            userId={userId}
            transactions={transactions}
            onLoadMore={() => {
              const lastTransaction = transactions[transactions.length - 1];
              const { id: cursor } = lastTransaction;

              return fetchMore({
                variables: {
                  cursor,
                },
                updateQuery: (prevResult, { fetchMoreResult: newData }) => {
                  const { transactions: prevTransactions } = prevResult;
                  const { transactions: newTransactions } = newData;

                  if (!newData || !newTransactions.length) return prevResult;

                  const transactions = [
                    ...prevTransactions,
                    ...newTransactions,
                  ];

                  const data = { transactions };
                  return data;
                },
              });
            }}
          />
        );
      }}
    </Query>
  );
};

UserTransactionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default UserTransactionsModal;
