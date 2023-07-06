// Laravel back-end mutations
export function setUser (state, userData) {
    state.user.token = userData.token;
    state.user.data = userData.user;
    sessionStorage.setItem('TOKEN', userData.token);
    sessionStorage.setItem('USER_ID', userData.user.id);
    sessionStorage.setItem('USER_NAME', userData.user.name);
}

export function logout (state) {
  state.user.data = {};
  state.user.token = null;
  sessionStorage.removeItem('TOKEN');
  sessionStorage.removeItem('USER_ID');
}

/* Double wrapping of data property by laravel resource so both action and mutation will unwrap a data layer
   Calculate the equity total / per stock here to avoid redundancy
*/
export function setUserStocks(state, userStocks) {
  userStocks.data.forEach(stock => stock.equity = stock.shareAmount * stock.sharePrice)
  userStocks.data.equityTotal = userStocks.data.reduce((total, stock) => total + stock.equity, 0).toFixed(2);
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

export function setNews(state, newsData) {
  console.log(newsData.data)
  state.newsData = newsData.data;
}
