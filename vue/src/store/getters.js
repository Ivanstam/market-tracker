export  function getStockCap(state) {
  const marketCap = state.stockInfo.marketCapitalization;
  const capFormatted = Math.floor(marketCap).toLocaleString() + ' K';
  return capFormatted;
}
