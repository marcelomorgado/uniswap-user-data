import React from "react";
import UsersTable from "../presentational/UsersTable";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const usersToRows = users => {
  const rows = users.map(user => {
    return { ...user, etherBalance: "-" };
  });

  return rows;
};

const GET_USERS = gql`
  {
    users {
      id
    }
  }
`;

class UsersTableContainer extends React.Component {
  render() {
    return (
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { users } = data;
          const rows = usersToRows(users);

          return <UsersTable rows={rows} onRowClick={this.props.onRowClick} />;
        }}
      </Query>
    );
  }
}

UsersTableContainer.propTypes = {
  onRowClick: PropTypes.func.isRequired,
};

export default UsersTableContainer;
