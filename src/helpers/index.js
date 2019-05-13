import { IN, OUT } from "../constants/TransactionType";
import TransactionEvent from "../constants/TransactionEvent";
const { TokenPurchase, EthPurchase, RemoveLiquidity } = TransactionEvent;

// Note:
// For each type of uniswap transactions I'm assuming that rule:
//
// TokenPurchase: ETH OUT + TOKEN IN
// EthPurchase: ETH IN + TOKEN OUT
// AddLiquidity: ETH OUT + TOKEN OUT
// RemoveLiquidity: ETH IN + TOKEN IN
const getEtherTransactionType = tx => {
  const { event: txEvent } = tx;

  if (!TransactionEvent[txEvent]) {
    throw Error(`Unexpected transaction event: ${txEvent}`);
  }

  const type =
    txEvent === EthPurchase || txEvent === RemoveLiquidity ? IN : OUT;
  return type;
};

const getTokenTransactionType = tx => {
  const { event: txEvent } = tx;

  if (!TransactionEvent[txEvent]) {
    throw Error(`Unexpected transaction event: ${txEvent}`);
  }

  const type =
    txEvent === TokenPurchase || txEvent === RemoveLiquidity ? IN : OUT;

  return type;
};

export const toEtherTransactions = transactions =>
  transactions.map(tx => {
    const { tx: txHash, user, ethAmount: amount } = tx;
    // Note: If is an ETH tx, tokenAddress will be '0x'
    const tokenAddress = "0x";
    const type = getEtherTransactionType(tx);
    return { txHash, type, tokenAddress, user, amount };
  });

export const toTokenTransactions = transactions =>
  transactions.map(tx => {
    const {
      tx: txHash,
      user,
      tokenAddress,
      tokenSymbol,
      tokenAmount: amount,
    } = tx;
    const type = getTokenTransactionType(tx);
    return { txHash, type, tokenAddress, tokenSymbol, user, amount };
  });

export default {
  toTokenTransactions,
  toEtherTransactions,
  getEtherTransactionType,
  getTokenTransactionType,
};
