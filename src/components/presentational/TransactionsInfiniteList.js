import React from "react";
import PropTypes from "prop-types";
import Transaction from "./Transaction";
import InfinityList from "./InfinityList";

export default function TransactionsInfiniteList({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) {
  return (
    <InfinityList
      items={items}
      loadNextPage={loadNextPage}
      hasNextPage={hasNextPage}
      isNextPageLoading={isNextPageLoading}
      rowRender={({ item, style }) => {
        return <Transaction transaction={item} style={style} />;
      }}
      rowHeight={30}
    />
  );
}

TransactionsInfiniteList.propTypes = {
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};
