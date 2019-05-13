import React, { Fragment } from "react";
import TransferEtherModal from "../presentational/TransferEtherModal";
import TransferEtherButton from "../presentational/TransferEtherButton";
import { ApolloConsumer } from "react-apollo";
import { gql } from "apollo-boost";

// const GET_USERS = gql`
//   query User {
//     users @client {
//       id
//     }
//   }
// `;

const GET_USERS = gql`
  query User {
    users @client {
      id
    }
  }
`;

const GET_USER_TRANSACTIONS = gql`
  query Transaction($userId: String!, $itemsPerPage: Int) {
    transactions(first: $itemsPerPage, where: { user: $userId }) {
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
  query Transaction($userId: String!) {
    transactions(where: { user: $userId }) @client
  }
`;

const GET_TRANSACTIONS3 = gql`
  query Transaction {
    transactions @client {
      id
      user
    }
  }
`;

const UPDATE_USERS = gql`
  mutation updateUsers($users: [User]!) {
    updateUsers(users: $users) @client
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
            const handleTransfer = async (from, to) => {
              client.mutate({
                mutation: UPDATE_USERS,
                variables: {
                  users: [
                    {
                      id: 1,

                      __typename: "User",
                    },
                  ],
                },
              });

              // const newTx = {
              //   id: "12346",
              //   user: "0x0000000000000000000000000000000000000000",
              //   __typename: "Transaction",
              // };
              //
              // client.writeData({ data: { transactions: [newTx] } });

              // const fromTxs = client.readFragment({
              //   user: from,
              //   fragment: gql`
              //     fragment userTransactions on transactions {
              //       id
              //       tx
              //       event
              //       block
              //       timestamp
              //       exchangeAddress
              //       tokenAddress
              //       tokenSymbol
              //       user
              //       ethAmount
              //       tokenAmount
              //       fee
              //     }
              //   `,
              // });

              const { data } = await client.query({
                query: GET_USERS,
                // variables: {
                //   userId: "0x0000000000000000000000000000000000000000",
                //   itemsPerPage: 15,
                // },
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
