import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TransactionsInfiniteList from "./TransactionsInfiniteList";
import { toTokenTransactions, toEtherTransactions } from "../../helpers";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = theme => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
});

class UserTransactionsModal extends React.Component {
  render() {
    const {
      classes,
      onLoadMore,
      handleClose,
      open,
      transactions,
      hasNextPage,
      isNextPageLoading,
    } = this.props;

    const etherTransactions = toEtherTransactions(transactions);

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <TransactionsInfiniteList
              items={etherTransactions}
              loadNextPage={onLoadMore}
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

UserTransactionsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  userId: PropTypes.string,
  transactions: PropTypes.array,
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
};

export default withStyles(modalStyles)(UserTransactionsModal);