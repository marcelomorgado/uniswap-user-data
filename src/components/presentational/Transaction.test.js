import React from "react";
import { shallow } from "enzyme";
import Transaction from "./Transaction";
import TransactionEvent from "../../constants/TransactionEvent";
const { EthPurchase } = TransactionEvent;

it("renders the component", () => {
  const transaction = {
    txHash: "txHash",
    type: EthPurchase,
    tokenAddress: "0x",
    user: "0x123User",
    amount: "1",
  };
  const props = {
    transaction,
    style: {},
  };

  expect(shallow(<Transaction {...props} />)).toMatchSnapshot();
});
