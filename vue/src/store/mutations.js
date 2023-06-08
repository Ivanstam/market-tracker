export function setUser (state, userData) {
    state.user.token = userData.token;
    state.user.data = userData.user;
    sessionStorage.setItem('TOKEN', userData.token);
}

export function logout (state) {
  state.user.data = {};
  state.user.token = null;
  sessionStorage.removeItem('TOKEN');
}

export function setStockInfo(state, stockInfo) {
  state.stockInfo = stockInfo.data;
}

export function setSearchedStocks(state, searchedStocks) {
  console.log(searchedStocks);
  state.searchedStocks = searchedStocks.data;
}

export function setExchangeStocks(state, exchangeStocks) {
  state.exchangeStocks = exchangeStocks.data;
}

export function setExSelection(state, selection) {
  state.exchangeSelection = selection.data;
}
