// Laravel back-end mutations
export function setUser (state, userData) {
    state.user.token = userData.token;
    state.user.data = userData.user;
    sessionStorage.setItem('TOKEN', userData.token);
    sessionStorage.setItem('USER_ID', userData.user.id);
}

export function logout (state) {
  state.user.data = {};
  state.user.token = null;
  sessionStorage.removeItem('TOKEN');
  sessionStorage.removeItem('USER_ID');
}

// Double wrapping of data property by laravel resource so both action and mutation will unwrap a data layer
export function setUserStocks(state, userStocks) {
  state.userStocks = userStocks.data;
  console.log(userStocks.data);
}

// Finnhub API data mutations
export function setStockInfo(state, stockInfo) {
  console.log(stockInfo.data);
  state.stockInfo = stockInfo.data;
}

export function setSearchedStocks(state, searchedStocks) {
  state.searchedStocks = searchedStocks.data;
  console.log(searchedStocks);
}

export function setExchangeStocks(state, exchangeStocks) {
  state.exchangeStocks = exchangeStocks.data;
  console.log(exchangeStocks.data)
}

export function setCandleData(state, candleData) {
  state.candleData = candleData.data;
  console.log(candleData.data);
}
