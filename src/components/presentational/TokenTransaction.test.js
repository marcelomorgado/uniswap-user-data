import React from "react";
import { shallow } from "enzyme";
import TokenTransaction from "./TokenTransaction";
import TransactionEvent from "../../constants/TransactionEvent";
const { EthPurchase } = TransactionEvent;

it("renders the component", () => {
  const transaction = {
    txHash: "txHash",
    type: EthPurchase,
    tokenSymbol: "TOKEN",
    user: "0x123User",
    amount: "1",
  };

  const props = {
    transaction,
  };

  expect(shallow(<TokenTransaction {...props} />)).toMatchSnapshot();
});
