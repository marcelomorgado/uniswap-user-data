import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import InfinityList from "./InfinityList";

export default function TransactionsList({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  // eslint-disable-next-line react/prop-types
  const rowRenderer = ({ item, style }) => {
    return <Transaction transaction={item} style={style} />;
  };

  return (
    <InfinityList
      items={items}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      rowRenderer={rowRenderer}
      rowHeight={30}
    />
  );
}

TransactionsList.propTypes = {
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};
