import React from "react";
import PropTypes from "prop-types";
import VirtualizedTable from "./VirtualizedTable";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

function UsersTable({ rows, onRowClick, classes }) {
  const columns = [
    {
      width: 200,
      flexGrow: 1.0,
      label: "User ID",
      dataKey: "id",
    },
    {
      width: 120,
      label: "ETH Balance",
      dataKey: "etherBalance",
      numeric: false,
    },
  ];

  return (
    <Paper className={classes.paper}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        onRowClick={e => {
          onRowClick(e);
        }}
        columns={columns}
      />
    </Paper>
  );
}

UsersTable.propTypes = {
  onRowClick: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      etherBalance: PropTypes.string.isRequired,
    })
  ).isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = () => ({
  paper: { height: 400, width: "100%" },
});

export default withStyles(styles)(UsersTable);
