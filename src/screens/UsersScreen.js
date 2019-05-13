import React, { Fragment } from "react";
import UsersListContainer from "../components/container/UsersListContainer";
import UserTransactionsModalContainer from "../components/container/UserTransactionsModalContainer";
import TransferEtherButtonContainer from "../components/container/TransferEtherButtonContainer";

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
        <TransferEtherButtonContainer />
        <UserTransactionsModalContainer
          open={txModalOpen}
          handleOpen={openTxModal}
          handleClose={closeTxModal}
          userId={userId}
        />
        <UsersListContainer onRowClick={onRowClick} />
      </Fragment>
    );
  }
}

export default UsersScreen;
