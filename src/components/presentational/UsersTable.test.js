import React from "react";
import { shallow } from "enzyme";
import UsersTable from "./UsersTable";

it("renders without crashing", () => {
  expect(shallow(<UsersTable />)).toMatchSnapshot();
});
