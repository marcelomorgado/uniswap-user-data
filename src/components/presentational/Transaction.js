import React from "react";
import PropTypes from "prop-types";

export default function Transaction({ transaction, style }) {
  const { tx } = transaction;
  return <div style={style}>{tx}</div>;
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};
