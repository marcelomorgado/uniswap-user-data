import React from "react";
import { shallow } from "enzyme";
import TransferEtherButton from "./TransferEtherButton";

it("renders the component", () => {
  const props = {
    onClick: () => {},
  };

  expect(shallow(<TransferEtherButton {...props} />)).toMatchSnapshot();
});
