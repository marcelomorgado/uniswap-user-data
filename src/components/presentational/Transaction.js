import React from "react";
import PropTypes from "prop-types";
import EtherTransaction from "./EtherTransaction";
import TokenTransaction from "./TokenTransaction";

function Transaction({ transaction, style }) {
  const { tokenAddress } = transaction;
  const isEtherTransfer = tokenAddress === "0x";
  return (
    <div style={style}>
      {isEtherTransfer ? (
        <EtherTransaction transaction={transaction} />
      ) : (
        <TokenTransaction transaction={transaction} />
      )}
    </div>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

export default Transaction;
