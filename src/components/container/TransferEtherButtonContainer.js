import React, { Fragment } from "react";
import TransferEtherModal from "../presentational/TransferEtherModal";
import TransferEtherButton from "../presentational/TransferEtherButton";
import { ApolloConsumer } from "react-apollo";
import { SEND_ETHER } from "../../queries";

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

  render() {
    const { state, openModal, closeModal } = this;
    const { modalOpen } = state;
    const onClick = () => {
      this.openModal();
    };

    return (
      <Fragment>
        <TransferEtherButton onClick={onClick} />

        <ApolloConsumer>
          {client => {
            const handleTransfer = async (from, to) => {
              // client.mutate({
              //   mutation: UPDATE_USER,
              //   variables: {
              //     userId: "0x0000000000000000000000000000000000000000",
              //     etherBalance: "123",
              //   },
              // });

              console.log(`${from} -> ${to}`);

              client.mutate({
                mutation: SEND_ETHER,
                variables: {
                  from,
                  to,
                  amount: "1",
                },
              });
            };
            return (
              <TransferEtherModal
                open={modalOpen}
                handleOpen={openModal}
                handleClose={closeModal}
                handleTransfer={handleTransfer}
              />
            );
          }}
        </ApolloConsumer>
      </Fragment>
    );
  }
}

export default TransferEtherButtonContainer;
