import React from "react";
import { shallow } from "enzyme";
import UserTransactionsModal from "./UserTransactionsModal";

it("renders the component", () => {
  const props = {
    open: true,
    handleClose: () => {},
    onLoadMore: () => {},
    userId: "0x123User",
    etherTransactions: [],
    hasNextPage: false,
    isNextPageLoading: false,
  };

  expect(shallow(<UserTransactionsModal {...props} />)).toMatchSnapshot();
});
