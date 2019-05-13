import React from "react";
import { shallow } from "enzyme";
import UsersListContainer from "./UsersListContainer";

it("renders the component", () => {
  const props = {
    onRowClick: () => {},
  };
  expect(shallow(<UsersListContainer {...props} />)).toMatchSnapshot();
});
