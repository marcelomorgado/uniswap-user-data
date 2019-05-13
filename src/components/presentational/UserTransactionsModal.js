import React from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import TransactionsList from "./TransactionsList";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class UserTransactionsModal extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {
      classes,
      handleClose,
      open,
      onLoadMore,
      etherTransactions,
      tokenTransactions,
      hasNextPage,
      isNextPageLoading,
    } = this.props;
    const { value } = this.state;

    return (
      <Modal open={open} onClose={handleClose}>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Ether Transactions" />
              <Tab label="Token Transactions" />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TabContainer>
              <TransactionsList
                items={etherTransactions}
                loadNextPage={onLoadMore}
                hasNextPage={hasNextPage}
                isNextPageLoading={isNextPageLoading}
              />
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <TransactionsList
                items={tokenTransactions}
                loadNextPage={onLoadMore}
                hasNextPage={hasNextPage}
                isNextPageLoading={isNextPageLoading}
              />
            </TabContainer>
          )}
        </div>
      </Modal>
    );
  }
}

UserTransactionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  userId: PropTypes.string,
  etherTransactions: PropTypes.array,
  tokenTransactions: PropTypes.array,
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserTransactionsModal);
