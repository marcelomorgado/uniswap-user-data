import React from "react";
import PropTypes from "prop-types";

export default function EtherTransaction({ transaction }) {
  const { txHash, type, tokenAddress, user, amount } = transaction;
  return (
    <div>
      {txHash} - {type} - {tokenAddress} - {user} - {amount}
    </div>
  );
}

EtherTransaction.propTypes = {
  transaction: PropTypes.object.isRequired,
};
