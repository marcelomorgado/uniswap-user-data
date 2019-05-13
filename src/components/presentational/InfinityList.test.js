import React from "react";
import { shallow } from "enzyme";
import InfinityList from "./InfinityList";

it("renders the component", () => {
  const props = {
    hasNextPage: false,
    isNextPageLoading: false,
    loadNextPage: () => {},
    items: [],
    rowRenderer: () => {},
    rowHeight: 10,
  };

  expect(shallow(<InfinityList {...props} />)).toMatchSnapshot();
});
