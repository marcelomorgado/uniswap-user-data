import React from "react";
import UsersTable from "../presentational/UsersTable";
import TransactionsModal from "../presentational/TransactionsModal";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const usersToRows = users => {
  const rows = users.map(user => {
    return { ...user, etherBalance: "-" };
  });

  return rows;
};

class UsersScreen extends React.Component {
  state = {
    modalOpen: false,
    userId: null,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  onRowClick = e => {
    /* eslint-disable no-console */
    const { rowData: user } = e;
    const { id: userId } = user;
    this.setState({ userId });
    console.log(user);
    this.handleOpen();
  };

  render() {
    return (
      <Query
        query={gql`
          {
            users {
              id
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { users } = data;
          const rows = usersToRows(users);

          return (
            <>
              <TransactionsModal
                open={this.state.modalOpen}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
                userId={this.state.userId}
              />
              <UsersTable rows={rows} onRowClick={this.onRowClick} />
            </>
          );
        }}
      </Query>
    );
  }
}

export default UsersScreen;
