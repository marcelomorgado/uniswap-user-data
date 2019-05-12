import React, { Fragment } from "react";
import UsersTableContainer from "../components/container/UsersTableContainer";
import UserTransactionsModal from "../components/container/UserTransactionsModal";

class UsersScreen extends React.Component {
  state = {
    modalOpen: false,
    userId: null,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  onRowClick = e => {
    /* eslint-disable no-console */
    const { rowData: user } = e;
    const { id: userId } = user;
    this.setState({ userId });
    console.log(user);
    this.handleOpen();
  };

  render() {
    return (
      <Fragment>
        <UserTransactionsModal
          open={this.state.modalOpen}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          userId={this.state.userId}
        />
        <UsersTableContainer onRowClick={this.onRowClick} />
      </Fragment>
    );
  }
}

export default UsersScreen;
