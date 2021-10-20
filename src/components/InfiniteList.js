import React from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";

//COMPONENT
import UserCard from "./UserCard";

const InfiniteList = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) => {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  const renderUserCard = ({ index, style, data }) => {
    if (!isItemLoaded) {
      return "Loading...";
    } else {
      return <UserCard index={index} style={style} data={data} />;
    }
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={itemCount}
              itemSize={140}
              itemData={items}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={width}
            >
              {renderUserCard}
            </List>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
