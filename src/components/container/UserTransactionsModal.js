import React from "react";
import PropTypes from "prop-types";
import TransactionsModal from "../presentational/TransactionsModal";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!) {
    transactions(where: { user: $userId }) {
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
      {({ loading, error, data }) => {
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
