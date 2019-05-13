import React from "react";
import { shallow } from "enzyme";
import UsersScreen from "./UsersScreen";

it("renders without crashing", () => {
  expect(shallow(<UsersScreen />)).toMatchSnapshot();
});
