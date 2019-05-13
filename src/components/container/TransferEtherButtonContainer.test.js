import React from "react";
import { shallow } from "enzyme";
import TransferEtherButtonContainer from "./TransferEtherButtonContainer";

it("renders the component", () => {
  expect(shallow(<TransferEtherButtonContainer />)).toMatchSnapshot();
});
