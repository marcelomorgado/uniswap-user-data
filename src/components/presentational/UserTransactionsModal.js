import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "./Modal";
import TransactionsList from "./TransactionsList";

class UserTransactionsModal extends React.Component {
  render() {
    const {
      onLoadMore,
      handleClose,
      open,
      etherTransactions,
      hasNextPage,
      isNextPageLoading,
    } = this.props;

    return (
      <div>
        <Modal open={open} onClose={handleClose}>
          <TransactionsList
            items={etherTransactions}
            loadNextPage={onLoadMore}
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
          />
        </Modal>
      </div>
    );
  }
}

UserTransactionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  userId: PropTypes.string,
  etherTransactions: PropTypes.array,
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
};

export default UserTransactionsModal;
