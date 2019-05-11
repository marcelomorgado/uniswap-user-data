import React from "react";
import UsersTable from "../presentational/UsersTable";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const usersToRows = users => {
  const rows = users.map(user => {
    return { ...user, etherBalance: "-" };
  });

  return rows;
};

const UsersScreen = () => (
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

      return <UsersTable rows={rows} />;
    }}
  </Query>
);

export default UsersScreen;
