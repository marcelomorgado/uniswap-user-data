import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    //width: theme.spacing.unit * 100,
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
});

class TransactionsModal extends React.Component {
  render() {
    const {
      classes,
      handleOpen,
      onLoadMore,
      handleClose,
      open,
      userId,
      transactions,
    } = this.props;
    const { length: txAmount } = transactions;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Button onClick={onLoadMore}>LoadMore</Button>
            <Typography variant="h6" id="modal-title">
              {`User ID = ${userId} with ${txAmount} txs`}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  userId: PropTypes.string,
  transactions: PropTypes.array,
};

export default withStyles(styles)(TransactionsModal);
