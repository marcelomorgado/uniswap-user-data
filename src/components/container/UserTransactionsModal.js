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

class UserTransactionsModal extends React.PureComponent {
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
              variables: {
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

          const hasNextPage = true;
          const isNextPageLoading = false;

          return (
            <TransactionsModal
              open={open}
              handleClose={handleClose}
              userId={userId}
              transactions={transactions}
              onLoadMore={onLoadMore}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
            />
          );
        }}
      </Query>
    );
  }
}

UserTransactionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default UserTransactionsModal;
