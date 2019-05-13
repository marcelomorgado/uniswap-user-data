import React from "react";
import PropTypes from "prop-types";

function EtherTransaction({ transaction }) {
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

function TokenTransaction({ transaction }) {
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
