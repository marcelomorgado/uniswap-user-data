import React from "react";
import PropTypes from "prop-types";
import InfinityList from "./InfinityList";
import User from "./User";

function UsersInfiniteList({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  onTransactionsClick,
}) {
  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ item, style }) => {
    return (
      <User
        style={style}
        user={item}
        handleTransactions={onTransactionsClick}
      />
    );
  };

  return (
    <InfinityList
      items={items}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      rowRenderer={rowRenderer}
      rowHeight={200}
    />
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
