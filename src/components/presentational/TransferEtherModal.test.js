import React from "react";
import { shallow } from "enzyme";
import TransferEtherModal from "./TransferEtherModal";

it("renders the component", () => {
  const props = {
    open: true,
    handleClose: () => {},
    handleTransfer: () => {},
  };

  expect(shallow(<TransferEtherModal {...props} />)).toMatchSnapshot();
});
