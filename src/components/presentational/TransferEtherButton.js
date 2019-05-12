import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function TransferEtherButton({ onClick, classes }) {
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      Transfer ETH
    </Button>
  );
}

TransferEtherButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(TransferEtherButton);
