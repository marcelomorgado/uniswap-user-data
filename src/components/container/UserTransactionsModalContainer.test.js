import React from "react";
import { shallow } from "enzyme";
import UserTransactionsModalContainer from "./UserTransactionsModalContainer";

it("renders the component", () => {
  const props = {
    open: true,
    handleClose: () => {},
    handleOpen: () => {},
    userId: "0x123User",
  };

  expect(
    shallow(<UserTransactionsModalContainer {...props} />)
  ).toMatchSnapshot();
});
