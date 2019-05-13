import React from "react";
import { shallow } from "enzyme";
import UsersList from "./UsersList";

it("renders the component", () => {
  const props = {
    hasNextPage: false,
    isNextPageLoading: false,
    loadNextPage: () => {},
    items: [],
    onTransactionsClick: () => {},
  };

  expect(shallow(<UsersList {...props} />)).toMatchSnapshot();
});
