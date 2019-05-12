import React, { Fragment } from "react";
import TransferEtherModal from "../presentational/TransferEtherModal";
import TransferEtherButton from "../presentational/TransferEtherButton";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";

const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!) {
    transactions(where: { user: $userId }) {
      id
      tx
      event
      block
      timestamp
      exchangeAddress
      tokenAddress
      tokenSymbol
      user
      ethAmount
      tokenAmount
      fee
    }
  }
`;

const GET_TRANSACTIONS2 = gql`
  {
    transactions(where: { user: $userId }) @client
  }
`;

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
            const handleTransfer = (from, to) => {
              const data = client.readQuery({
                query: GET_USER_TRANSACTIONS,
                variables: {
                  userId: from,
                },
              });
              console.log(data);
              // const newTx = {
              //   id: "",
              //   tx: "",
              //   event: "",
              //   block: "",
              //   timestamp: "",
              //   exchangeAddress: "",
              //   tokenAddress: "",
              //   tokenSymbol: "",
              //   user: from,
              //   ethAmount: "",
              //   tokenAmount: "",
              //   fee: "",
              //   __typename: "Transaction",
              // };
              //
              // client.writeQuery({
              //   query: GET_TRANSACTIONS,
              //   data: {
              //     transactions: [newTx, ...data.transactions],
              //   },
              // });
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
