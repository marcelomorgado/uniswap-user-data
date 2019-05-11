import React from "react";
import PropTypes from "prop-types";
import VirtualizedTable from "./VirtualizedTable";

function UsersTable({ rows }) {
  const onClick = e => {
    console.log(e);
  };

  const columns = [
    {
      width: 200,
      flexGrow: 1.0,
      label: "User ID",
      dataKey: "userId",
    },
    {
      width: 120,
      label: "ETH Balance",
      dataKey: "etherBalance",
      numeric: true,
    },
  ];

  return (
    <VirtualizedTable
      rowCount={rows.length}
      rowGetter={({ index }) => rows[index]}
      onRowClick={onClick}
      columns={columns}
    />
  );
}

UsersTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.string.isRequired,
      etherBalance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default UsersTable;
