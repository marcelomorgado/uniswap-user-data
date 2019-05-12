import React from "react";
import PropTypes from "prop-types";
import TransactionsModal from "../presentational/TransactionsModal";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!) {
    transactions(first: 2, where: { user: $userId }) {
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

const GET_MORE_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!, $cursor: String) {
    transactions(first: 2, where: { user: $userId, id_lt: $cursor }) {
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

class UserTransactionsModalContainer extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
  };

  render() {
    const { userId, open, handleClose } = this.props;
    return (
      <Query query={GET_USER_TRANSACTIONS} variables={{ userId }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { transactions } = data;

          const onLoadMore = () => {
            const lastTransaction = transactions[transactions.length - 1];
            const { id: cursor } = lastTransaction;

            this.setState({ isNextPageLoading: true });

            return fetchMore({
              query: GET_MORE_USER_TRANSACTIONS,
              variables: {
                userId,
                cursor,
              },
              updateQuery: (prevResult, { fetchMoreResult: newData }) => {
                const { transactions: prevTransactions } = prevResult;
                const { transactions: newTransactions } = newData;

                let data;
                if (!newData || !newTransactions.length) {
                  data = prevResult;
                  this.setState({ hasNextPage: false });
                } else {
                  const transactions = [
                    ...prevTransactions,
                    ...newTransactions,
                  ];

                  data = { transactions };
                }

                this.setState({ isNextPageLoading: false });
                return data;
              },
            });
          };

          return (
            <TransactionsModal
              open={open}
              handleClose={handleClose}
              userId={userId}
              transactions={transactions}
              onLoadMore={onLoadMore}
              hasNextPage={this.state.hasNextPage}
              isNextPageLoading={this.state.isNextPageLoading}
            />
          );
        }}
      </Query>
    );
  }
}

UserTransactionsModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default UserTransactionsModalContainer;
