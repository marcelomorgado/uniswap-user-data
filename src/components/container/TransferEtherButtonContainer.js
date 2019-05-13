import React, { Fragment } from "react";
import TransferEtherModal from "../presentational/TransferEtherModal";
import TransferEtherButton from "../presentational/TransferEtherButton";
import { ApolloConsumer } from "react-apollo";
import { GET_USERS, UPDATE_USERS } from "../../queries";

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
              const users = [
                {
                  id: "0x8999999999999999999999999999999999999999",
                  etherBalance: "999",
                  __typename: "User",
                },
              ];

              client.mutate({
                mutation: UPDATE_USERS,
                variables: {
                  users,
                },
                optimisticResponse: {
                  users,
                },
                //https://medium.freecodecamp.org/how-to-update-the-apollo-clients-cache-after-a-mutation-79a0df79b840
                update: (proxy, { data: { users } }) => {
                  try {
                    if (!users) return;

                    const data = proxy.readQuery({
                      query: GET_USERS,
                      variables: {
                        itemsPerPage: 20,
                      },
                    });

                    data.users = users;

                    proxy.writeQuery({
                      query: GET_USERS,
                      variables: {
                        itemsPerPage: 20,
                      },
                      data,
                    });
                  } catch (error) {
                    console.log(error);
                  }
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
