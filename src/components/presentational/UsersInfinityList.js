import React from "react";
import PropTypes from "prop-types";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import User from "./User";

function UsersInfiniteList({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage,
  onTransactionsClick,
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = index => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>{"Loading..."}</div>;
    }
    const user = items[index];
    return (
      <User
        style={style}
        user={user}
        handleTransactions={onTransactionsClick}
      />
    );
  };

  Item.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <List
          className="List"
          height={600}
          itemCount={itemCount}
          itemSize={200}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}

UsersInfiniteList.propTypes = {
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  onTransactionsClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default UsersInfiniteList;
