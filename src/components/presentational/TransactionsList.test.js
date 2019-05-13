import React from "react";
import { shallow } from "enzyme";
import TransactionsList from "./TransactionsList";

it("renders the component", () => {
  const props = {
    hasNextPage: false,
    isNextPageLoading: false,
    loadNextPage: () => {},
    items: [],
  };

  expect(shallow(<TransactionsList {...props} />)).toMatchSnapshot();
});
