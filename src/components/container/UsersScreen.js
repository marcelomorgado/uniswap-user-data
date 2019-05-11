import React from "react";
import UsersTable from "../presentational/UsersTable";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

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

      let id = 0;
      const rows = users.map(u => {
        const { id: userId } = u;
        ++id;
        return { id, userId, etherBalance: 123 };
      });

      return <UsersTable rows={rows} />;
    }}
  </Query>
);

export default UsersScreen;
