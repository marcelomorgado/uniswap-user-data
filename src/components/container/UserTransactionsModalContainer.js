import React from "react";
import PropTypes from "prop-types";
import UserTransactionsModal from "../presentational/UserTransactionsModal";
import { Query } from "react-apollo";
import {
  GET_MORE_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS,
} from "../../queries";

const ITEMS_PER_PAGE = 15;

class UserTransactionsModalContainer extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
  };

  render() {
    const { userId, open, handleClose } = this.props;
    const { hasNextPage, isNextPageLoading } = this.state;

    if (!userId) return <></>;

    return (
      <Query
        query={GET_USER_TRANSACTIONS}
        variables={{ userId, itemsPerPage: ITEMS_PER_PAGE }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const { transactions } = data;

          if (!transactions.length) {
            this.setState({ hasNextPage: false });
          }

          const onLoadMore = () => {
            const lastTransaction = transactions[transactions.length - 1];
            const { id: cursor } = lastTransaction;

            this.setState({ isNextPageLoading: true });

            const updateQuery = (prevResult, { fetchMoreResult: newData }) => {
              const { transactions: prevTransactions } = prevResult;
              const { transactions: newTransactions } = newData;
              const hasNewData = newTransactions.length;
              let data;

              if (!hasNewData) {
                data = prevResult;
                this.setState({ hasNextPage: false });
              } else {
                const transactions = [...prevTransactions, ...newTransactions];
                data = { transactions };
              }

              this.setState({ isNextPageLoading: false });
              return data;
            };

            return fetchMore({
              query: GET_MORE_USER_TRANSACTIONS,
              variables: {
                userId,
                cursor,
                itemsPerPage: ITEMS_PER_PAGE,
              },
              updateQuery,
            });
          };

          return (
            <UserTransactionsModal
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

UserTransactionsModalContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default UserTransactionsModalContainer;
