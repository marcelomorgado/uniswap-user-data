import React from "react";
import { shallow } from "enzyme";
import EtherTransaction from "./EtherTransaction";
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
  };

  expect(shallow(<EtherTransaction {...props} />)).toMatchSnapshot();
});
