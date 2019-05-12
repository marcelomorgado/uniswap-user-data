import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Immutable from "immutable";

import { AutoSizer, InfiniteLoader, List } from "react-virtualized";

import styles from "./InfiniteLoader.example.css";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const modalStyles = theme => ({
  paper: {
    position: "absolute",
    //width: theme.spacing.unit * 100,
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
  },
});

class TransactionsModal extends React.Component {
  render() {
    const { classes, onLoadMore, handleClose, open, transactions } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Button onClick={onLoadMore}>LoadMore</Button>

            <InfiniteLoaderExample
              list={transactions}
              loadMoreRows={onLoadMore}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

TransactionsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  userId: PropTypes.string,
  transactions: PropTypes.array,
};

export default withStyles(modalStyles)(TransactionsModal);

class InfiniteLoaderExample extends React.PureComponent {
  // static contextTypes = {
  //   list: PropTypes.instanceOf(Immutable.List).isRequired,
  // };

  constructor(props) {
    super(props);

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
    };

    this._timeoutIdMap = {};

    this._clearData = this._clearData.bind(this);
    this._isRowLoaded = this._isRowLoaded.bind(this);
    this._loadMoreRows = this._loadMoreRows.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  componentWillUnmount() {
    Object.keys(this._timeoutIdMap).forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
  }

  render() {
    const { list, loadMoreRows } = this.props;
    // console.log(`-> ${list.length}`);
    // const { loadedRowCount, loadingRowCount } = this.state;
    // console.log(`loadedRowCount = ${loadedRowCount}`);
    // console.log(`loadingRowCount = ${loadingRowCount}`);

    return (
      <InfiniteLoader
        isRowLoaded={this._isRowLoaded}
        loadMoreRows={this._loadMoreRows}
        rowCount={list.length}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref={registerChild}
                className={styles.List}
                height={200}
                onRowsRendered={onRowsRendered}
                rowCount={list.length}
                rowHeight={30}
                rowRenderer={this._rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }

  _clearData() {
    this.setState({
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
    });
  }

  _isRowLoaded({ index }) {
    const { loadedRowsMap } = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  _loadMoreRows({ startIndex, stopIndex }) {
    console.log("LOAD MORE!!");
    const { loadedRowsMap, loadingRowCount } = this.state;
    const increment = stopIndex - startIndex + 1;

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment,
    });

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state;

      delete this._timeoutIdMap[timeoutId];

      for (var i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment,
      });

      promiseResolver();
    }, 1000 + Math.round(Math.random() * 2000));

    this._timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }

  _rowRenderer({ index, key, style }) {
    const { list } = this.props;
    const { loadedRowsMap } = this.state;

    const row = list[index];

    let content;

    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = row.tx;
    } else {
      content = (
        <div className={styles.placeholder} style={{ width: row.size }} />
      );
    }

    return (
      <div className={styles.row} key={key} style={style}>
        {content}
      </div>
    );
  }
}

InfiniteLoaderExample.propTypes = {
  list: PropTypes.array,
};
