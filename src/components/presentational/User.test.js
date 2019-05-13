import React from "react";
import { shallow } from "enzyme";
import User from "./User";

it("renders the component", () => {
  const user = { id: "0x123User", etherBalance: "10" };
  const props = {
    style: {},
    user,
    handleTransactions: () => {},
  };

  expect(shallow(<User {...props} />)).toMatchSnapshot();
});
