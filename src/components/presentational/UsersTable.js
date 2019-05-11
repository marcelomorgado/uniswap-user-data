import React from "react";
import PropTypes from "prop-types";
import VirtualizedTable from "./VirtualizedTable";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

function UsersTable({ rows, classes }) {
  const onClick = e => {
    /* eslint-disable no-console */
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
    <Paper className={classes.paper}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={onClick}
        columns={columns}
      />
    </Paper>
  );
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.string.isRequired,
      etherBalance: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const styles = () => ({
  paper: { height: 400, width: "100%" },
});

export default withStyles(styles)(UsersTable);
