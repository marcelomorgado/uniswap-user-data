import React from "react";
import { shallow } from "enzyme";
import Modal from "./Modal";

it("renders the component", () => {
  const props = {
    open: true,
    onClose: () => {},
    children: {},
  };

  expect(shallow(<Modal {...props} />)).toMatchSnapshot();
});
