import React from "react";
import { shallow } from "enzyme";
import UsersTable from "./UsersTable";

it("renders without crashing", () => {
  const rows = [
    {
      id: "0x0000000000c90bc353314b6911180ed7e06019a9",
      etherBalance: "1.234567890",
    },
    {
      id: "0x000000000a3c7c86345a35a0e97a4bb4370a8dd9",
      etherBalance: "1000.98787878787",
    },
  ];
  expect(shallow(<UsersTable rows={rows} />)).toMatchSnapshot();
});
