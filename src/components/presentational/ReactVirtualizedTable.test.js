import React from "react";
import { shallow } from "enzyme";
import ReactVirtualizedTable from "./ReactVirtualizedTable";

it("renders without crashing", () => {
  expect(shallow(<ReactVirtualizedTable />)).toMatchSnapshot();
});
