import React, { Fragment } from "react";
import TransferEtherModal from "../presentational/TransferEtherModal";
import TransferEtherButton from "../presentational/TransferEtherButton";

class TransferEtherButtonContainer extends React.Component {
  state = {
    modalOpen: false,
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  handleTransfer = (from, to) => {
    console.log(`${from} -> ${to}`);
  };

  render() {
    const { state, openModal, closeModal, handleTransfer } = this;
    const { modalOpen } = state;
    const onClick = () => {
      this.openModal();
    };

    return (
      <Fragment>
        <TransferEtherButton onClick={onClick} />
        <TransferEtherModal
          open={modalOpen}
          handleOpen={openModal}
          handleClose={closeModal}
          handleTransfer={handleTransfer}
        />
      </Fragment>
    );
  }
}

export default TransferEtherButtonContainer;
