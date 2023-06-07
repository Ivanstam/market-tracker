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
