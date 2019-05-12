import React, { Fragment } from "react";
import UsersTableContainer from "../components/container/UsersTableContainer";
import UserTransactionsModal from "../components/container/UserTransactionsModal";

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

  onRowClick = e => {
    const { rowData: user } = e;
    const { id: userId } = user;
    this.setState({ userId });
    console.log(user);
    this.openTxModal();
  };

  render() {
    const { state, openTxModal, closeTxModal, onRowClick } = this;
    const { txModalOpen, userId } = state;

    return (
      <Fragment>
        <UserTransactionsModal
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
