import React from "react";
//import UsersTable from "../presentational/UsersTable";
import UsersInfinityList from "../presentational/UsersInfinityList";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { GET_USERS, GET_MORE_USERS } from "../../queries";

const ITEMS_PER_PAGE = 20;

class UsersTableContainer extends React.Component {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
  };

  render() {
    const { hasNextPage, isNextPageLoading } = this.state;
    const { onRowClick } = this.props;
    return (
      <Query query={GET_USERS} variables={{ itemsPerPage: ITEMS_PER_PAGE }}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { users } = data;
          if (users.length === 1) console.log(users[0]);

          if (!users.length) {
            this.setState({ hasNextPage: false });
          }

          const onLoadMore = () => {
            const lastUser = users[users.length - 1];
            const { id: cursor } = lastUser;

            this.setState({ isNextPageLoading: true });

            const updateQuery = (prevResult, { fetchMoreResult: newData }) => {
              const { users: prevUsers } = prevResult;
              const { users: newUsers } = newData;
              const hasNewData = newUsers.length;
              let data;

              if (!hasNewData) {
                data = prevResult;
                this.setState({ hasNextPage: false });
              } else {
                const users = [...prevUsers, ...newUsers];
                data = { users };
              }

              this.setState({ isNextPageLoading: false });
              return data;
            };

            return fetchMore({
              query: GET_MORE_USERS,
              variables: {
                cursor,
                itemsPerPage: ITEMS_PER_PAGE,
              },
              updateQuery,
            });
          };
          return (
            <UsersInfinityList
              items={users}
              loadNextPage={onLoadMore}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
              onTransactionsClick={onRowClick}
            />
          );
        }}
      </Query>
    );
  }
}

UsersTableContainer.propTypes = {
  onRowClick: PropTypes.func.isRequired,
};

export default UsersTableContainer;
