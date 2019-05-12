import React, { Fragment } from "react";
import UsersTableContainer from "../components/container/UsersTableContainer";
import UserTransactionsModalContainer from "../components/container/UserTransactionsModalContainer";

class UsersScreen extends React.Component {
  state = {
    txModalOpen: false,
    userId: null,
  };

  openTxModal = () => {
    this.setState({ txModalOpen: true });
  };

  closeTxModal = () => {
    this.setState({ txModalOpen: false });
  };

  onRowClick = userId => {
    this.setState({ userId });
    this.openTxModal();
  };

  render() {
    const { state, openTxModal, closeTxModal, onRowClick } = this;
    const { txModalOpen, userId } = state;

    return (
      <Fragment>
        <UserTransactionsModalContainer
          open={txModalOpen}
          handleOpen={openTxModal}
          handleClose={closeTxModal}
          userId={userId}
        />
        <UsersTableContainer onRowClick={onRowClick} />
      </Fragment>
    );
  }
}

export default UsersScreen;
