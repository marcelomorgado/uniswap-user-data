import React from "react";
import PropTypes from "prop-types";

function Transaction({ transaction, style }) {
  const { txHash, type, tokenAddress, user, amount } = transaction;
  return (
    <div style={style}>
      <div>
        {txHash} - {type} - {tokenAddress} - {user} - {amount}
      </div>
    </div>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

export default Transaction;
