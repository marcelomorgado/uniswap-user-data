import React from "react";
import PropTypes from "prop-types";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

// Component based on the react-window-infinite-loader documentation
// See more:
// https://github.com/bvaughn/react-window-infinite-loader
// https://codesandbox.io/s/x70ly749rq
function InfiniteList({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
  rowRenderer,
  rowHeight,
}) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = index => !hasNextPage || index < items.length;

  // eslint-disable-next-line react/prop-types
  const Item = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>{"Loading..."}</div>;
    }
    const item = items[index];
    return rowRenderer({ item, style });
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
          itemSize={rowHeight}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
}

InfiniteList.propTypes = {
  hasNextPage: PropTypes.bool.isRequired,
  isNextPageLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  rowHeight: PropTypes.number.isRequired,
};

export default InfiniteList;
