import React from "react";
import PropTypes from "prop-types";

export default function TokenTransaction({ transaction }) {
  const { txHash, type, tokenSymbol, user, amount } = transaction;
  return (
    <div>
      {txHash} - {type} - {tokenSymbol} - {user} - {amount}
    </div>
  );
}
TokenTransaction.propTypes = {
  transaction: PropTypes.object.isRequired,
};
